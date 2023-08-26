const Record = require('../models/Record');

exports.getRecords = async (req, res) => {
  try {
    const userId = req.user.userId; 
    const records = await Record.find({ userId });
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

exports.createRecord = async (req, res) => {
  const { name, age, email, phoneNumber } = req.body;
  //const userId = req.user.userId; 
  try {
    const record = new Record({
   
      name,
      age,
      email,
      phoneNumber,
    });
    await record.save();
    res.status(201).json({ message: 'Record created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

exports.updateRecord = async (req, res) => {
  const recordId = req.params.id;
  const { name, age, email, phoneNumber } = req.body;
  try {
    const updatedRecord = await Record.findByIdAndUpdate(
      recordId,
      { name, age, email, phoneNumber },
      { new: true }
    );
    if (!updatedRecord) {
      return res.status(404).json({ error: 'Record not found' });
    }
    res.status(200).json({ message: 'Record updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

exports.deleteRecord = async (req, res) => {
  const recordId = req.params.id;
  try {
    const deletedRecord = await Record.findByIdAndDelete(recordId);
    if (!deletedRecord) {
      return res.status(404).json({ error: 'Record not found' });
    }
    res.status(200).json({ message: 'Record deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};
