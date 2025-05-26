const AboutHero = require('../models/aboutHeroModel');

exports.getHeroSection = async (req, res) => {
  try {
    const data = await AboutHero.findOne();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch hero section' });
  }
};

exports.updateHeroSection = async (req, res) => {
  try {
    const {
      mainTitle,
      subtitle,
      videoUrl,
      heroHeight,
      overlayGradient,
      overlayOpacity,
      showScrollIndicator,
      sectionVisible
    } = req.body;

    const updateData = {
      mainTitle,
      subtitle,
      videoUrl,
      heroHeight,
      overlayGradient,
      overlayOpacity,
      showScrollIndicator,
      sectionVisible,
    };

    if (req.files?.backgroundImage?.[0]) {
      updateData.backgroundImage = `/uploads/${req.files.backgroundImage[0].filename}`;
    }
    if (req.files?.backgroundVideo?.[0]) {
      updateData.backgroundVideo = `/uploads/${req.files.backgroundVideo[0].filename}`;
    }

    let hero = await AboutHero.findOne();
    if (hero) {
      await AboutHero.updateOne({}, updateData);
      hero = await AboutHero.findOne();
    } else {
      hero = new AboutHero(updateData);
      await hero.save();
    }

    res.json({ message: 'Hero section updated successfully', hero });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update hero section' });
  }
};
