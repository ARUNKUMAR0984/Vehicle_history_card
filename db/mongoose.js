const mongoose = require('mongoose');

// MongoDB connection function
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://arunkumars97462:Arun4785997@nipponcluster.0gtlw.mongodb.net/LOGIN', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connection successful');
  } catch (err) {
    console.error('MongoDB connection failed: ', err);
  }
};

// Create a schema for vehicle form data
const vehicleSchema = new mongoose.Schema({
  model: { type: String, required: true },
  ccr: { type: String, required: true },
  engine_type: { type: String, required: true },
  body_color: { type: String, required: true },
  obl: { type: String, required: true },
  shift: { type: String, enum: ['I', 'II', 'III'], required: true },
  group: { type: String, enum: ['D', 'E', 'F'], required: true },
  vin_no: { type: String, required: true },
  trim_date: { type: Date, required: true },
  destination: { type: String, required: true },
  int_color: { type: String, required: true },
  // VQA inspection details
  vqa: {
      pre_drive_1: {
          status: { type: String, enum: ['OK', 'NG'], required: true },
          description: { type: String }
      },
      tester: {
          status: { type: String, enum: ['OK', 'NG'], required: true },
          description: { type: String }
      },
      static: {
          status: { type: String, enum: ['OK', 'NG'], required: true },
          description: { type: String }
      },
      shower: {
          status: { type: String, enum: ['OK', 'NG'], required: true },
          description: { type: String }
      },
      dynamic: {
          status: { type: String, enum: ['OK', 'NG'], required: true },
          description: { type: String }
      },
      pesd_sample: {
          status: { type: String, enum: ['OK', 'NG'], required: true },
          description: { type: String }
      },
      temp_ok: {
          status: { type: String, enum: ['OK', 'NG'], required: true },
          description: { type: String }
      },
      kanken: {
          status: { type: String, enum: ['OK', 'NG'], required: true },
          description: { type: String }
      },
      final_ok_date: { type: Date, required: true }
  },
  // FSTR inspection details
  fstr: {
      pre_drive_1: {
          status: { type: String, enum: ['OK', 'NG'], required: true },
          description: { type: String }
      },
      tester: {
          status: { type: String, enum: ['OK', 'NG'], required: true },
          description: { type: String }
      },
      static: {
          status: { type: String, enum: ['OK', 'NG'], required: true },
          description: { type: String }
      },
      shower: {
          status: { type: String, enum: ['OK', 'NG'], required: true },
          description: { type: String }
      },
      dynamic: {
          status: { type: String, enum: ['OK', 'NG'], required: true },
          description: { type: String }
      },
      pji_sample: {
          description: { type: String }
      }
  },
  DynamicInspection:{
    inspected_by: { type: String, required: false },
  static_check: { type: String, required: false },
  ltt: { type: String, required: false },
  concern_description: { type: String, required: false },
  repair_details: { type: String, required: false },
  repair_seal: { type: String, required: false },
  vqa_seal: { type: String, required: false },
  },
  pesd_inspection: {
    concern_description: { type: String, required: false },
    repair_details: { type: String, required: false },
    prod_seal: { type: String, required: false },
    vqa_seal: { type: String, required: false },
  },

  temp_ok: {
    concern_description: { type: String, required: false },
    repair_details: { type: String, required: false },
    prod_seal: { type: String, required: false },
    vqa_seal: { type: String, required: false },
  },

  final_ok_check: {
    odo_meter: { type: String, required: false },
    wax: { type: String, required: false },
    bcm_siw: { type: String, required: false },
    audio: { type: String, required: false },
    battery: { type: String, required: false },
    concern_description: { type: String, required: false },
    repair_details: { type: String, required: false },
    prod_seal: { type: String, required: false },
    vqa_seal: { type: String, required: false },
  },

  qa_sampling: {
    concern_description: { type: String, required: false },
    repair_details: { type: String, required: false },
    repair_seal: { type: String, required: false },
    vqa_seal: { type: String, required: false },
  },

  other_description: {
    concern_description: { type: String, required: false },
    repair_details: { type: String, required: false },
    prod_seal: { type: String, required: false },
    vqa_seal: { type: String, required: false },
  },
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  Password: { type: String, required: true },
  Email: { type: String, required: true },
  PhoneNumber: { type: Number, required: true }
});


// Create models based on the schemas
const Users = mongoose.model('users', userSchema);
const Vehicle = mongoose.model('vehicle_data', vehicleSchema);

// Export the connection function and models
module.exports = { connectDB, Vehicle, Users };
