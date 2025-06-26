const TrustSection = require('../models/vTrust.js');

exports.getTrustData = async (req, res) => {
  const trustData = await TrustSection.findOne();
  res.json(trustData);
};

exports.addPartner = async (req, res) => {
  let trustData = await TrustSection.findOne();

  if (!trustData) {
    trustData = new TrustSection({ partners: [], efforts: [] });
  }

  const newPartner = req.body;
  trustData.partners.push(newPartner);
  await trustData.save();

  res.status(201).json(newPartner);
};

exports.updatePartner = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  const trustData = await TrustSection.findOne();

  const index = trustData.partners.findIndex(p => p.id === id);
  if (index !== -1) {
    trustData.partners[index] = updatedData;
    await trustData.save();
    res.json(updatedData);
  } else {
    res.status(404).json({ message: 'Partner not found' });
  }
};

exports.deletePartner = async (req, res) => {
  const { id } = req.params;
  const trustData = await TrustSection.findOne();

  trustData.partners = trustData.partners.filter(p => p.id !== id);
  await trustData.save();
  res.json({ message: 'Partner deleted' });
};

exports.updateEffort = async (req, res) => {
  const { id } = req.params;
  const updatedEffort = req.body;
  const trustData = await TrustSection.findOne();

  const index = trustData.efforts.findIndex(e => e.id === id);
  if (index !== -1) {
    trustData.efforts[index] = updatedEffort;
    await trustData.save();
    res.json(updatedEffort);
  } else {
    res.status(404).json({ message: 'Effort not found' });
  }
};

exports.initTrustSection = async (req, res) => {
  const exists = await TrustSection.findOne();
  if (!exists) {
    const trustData = new TrustSection({ partners: [], efforts: [] });
    await trustData.save();
    res.status(201).json(trustData);
  } else {
    res.status(400).json({ message: 'Trust section already initialized' });
  }
};
