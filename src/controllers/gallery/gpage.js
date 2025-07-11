const Gallery = require('../../models/gallery/gpage');

// --- Items ---
exports.getAllItems = async (req, res) => {
  try {
    const { 
      category, 
      featured, 
      rotatingGallery, 
      tags,
      limit = 50,
      sort = 'uploadDate',
      order = 'desc'
    } = req.query;

    // Build filter object
    const filter = { type: 'item' };
    
    if (category) filter.category = category;
    if (featured !== undefined) filter.featured = featured === 'true';
    if (rotatingGallery !== undefined) filter.rotatingGallery = rotatingGallery === 'true';
    if (tags) {
      const tagArray = tags.split(',').map(tag => tag.trim());
      filter.tags = { $in: tagArray };
    }

    // Build sort object
    const sortObj = {};
    sortObj[sort] = order === 'desc' ? -1 : 1;

    const items = await Gallery.find(filter)
      .sort(sortObj)
      .limit(parseInt(limit))
      .lean();

    // Transform data for frontend
    const transformedItems = items.map(item => ({
      id: item._id,
      title: item.title,
      category: item.category,
      image: item.imageUrl || item.thumbnail,
      thumbnail: item.thumbnail,
      description: item.description,
      uploadDate: item.uploadDate,
      featured: item.featured,
      tags: item.tags || [],
      rotatingGallery: item.rotatingGallery
    }));

    res.json({
      success: true,
      data: transformedItems,
      count: transformedItems.length
    });
  } catch (error) {
    console.error('Error fetching gallery items:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch gallery items',
      error: error.message
    });
  }
};

exports.addItem = async (req, res) => {
  const item = new Gallery({ ...req.body, type: 'item', uploadDate: new Date() });
  await item.save();

  // Increase itemCount in category
  await Gallery.updateOne(
    { type: 'category', name: item.category },
    { $inc: { itemCount: 1 } }
  );

  res.status(201).json(item);
};

exports.updateItem = async (req, res) => {
  const updated = await Gallery.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteItem = async (req, res) => {
  const item = await Gallery.findByIdAndDelete(req.params.id);
  await Gallery.updateOne(
    { type: 'category', name: item.category },
    { $inc: { itemCount: -1 } }
  );
  res.json({ success: true });
};

// --- Categories ---
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Gallery.find({ type: 'category' })
      .sort({ name: 1 })
      .lean();

    // Also get item counts for each category
    const categoryData = await Promise.all(
      categories.map(async (category) => {
        const itemCount = await Gallery.countDocuments({ 
          type: 'item', 
          category: category.name 
        });
        
        return {
          id: category._id,
          name: category.name,
          description: category.description,
          itemCount: itemCount
        };
      })
    );

    res.json({
      success: true,
      data: categoryData,
      count: categoryData.length
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch categories',
      error: error.message
    });
  }
};

exports.addCategory = async (req, res) => {
  const cat = new Gallery({ ...req.body, type: 'category', itemCount: 0 });
  await cat.save();
  res.status(201).json(cat);
};

exports.deleteCategory = async (req, res) => {
  await Gallery.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};

exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const updatedCategory = await Gallery.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json(updatedCategory);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update category', error: err.message });
  }
};

exports.getRotatingGalleryItems = async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    
    const items = await Gallery.find({ 
      type: 'item', 
      rotatingGallery: true 
    })
      .sort({ uploadDate: -1 })
      .limit(parseInt(limit))
      .lean();

    const transformedItems = items.map(item => ({
      id: item._id,
      title: item.title,
      category: item.category,
      image: item.imageUrl || item.thumbnail,
      description: item.description,
      uploadDate: item.uploadDate,
      tags: item.tags || []
    }));

    res.json({
      success: true,
      data: transformedItems,
      count: transformedItems.length
    });
  } catch (error) {
    console.error('Error fetching rotating gallery items:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch rotating gallery items',
      error: error.message
    });
  }
};

exports.getFeaturedItems = async (req, res) => {
  try {
    const { limit = 6 } = req.query;
    
    const items = await Gallery.find({ 
      type: 'item', 
      featured: true 
    })
      .sort({ uploadDate: -1 })
      .limit(parseInt(limit))
      .lean();

    const transformedItems = items.map(item => ({
      id: item._id,
      title: item.title,
      category: item.category,
      image: item.imageUrl || item.thumbnail,
      description: item.description,
      uploadDate: item.uploadDate,
      tags: item.tags || []
    }));

    res.json({
      success: true,
      data: transformedItems,
      count: transformedItems.length
    });
  } catch (error) {
    console.error('Error fetching featured items:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch featured items',
      error: error.message
    });
  }
};