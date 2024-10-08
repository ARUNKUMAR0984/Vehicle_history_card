const express = require('express');
const bodyParser = require('body-parser');
const { connectDB, Vehicle, Users } = require('./db/mongoose'); // Importing both the connection function and the model
const app = express();

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Connect to MongoDB
connectDB();

app.get('/', (req, res) => {
  res.render('Login');
});

app.get('/Signup', (req, res) => {
  res.render('Signup'); // Renders Signup.ejs
});


app.get('/login', (req, res) => {
  res.render('Login');
})

app.get('/logout', (req, res) => {
  res.render('Login');

});

0


app.post('/signup', async (req, res) => {

  try {
    const existingUser = await Users.findOne({ username: req.body.username });
    if (existingUser) {
      // If the username exists, render the signup page with an error message
      return res.render('Signup', { message: 'Username already exists. Please choose another one.' });
    }

    const newUser = new Users({
      username: req.body.username, // Accessing based on 'name' attribute
      Password: req.body.password, // Change to match the form
      Email: req.body.email, // Accessing based on 'name' attribute
      PhoneNumber: req.body.phoneNumber // Accessing based on 'name' attribute
    });
    res.render('Login');


    newUser.save()
    res.render('Signup', { message: "New User Added Successfully!" });
  }
  catch (err) {
    res.status(400).send("Error in Saving the New User");
  }


});


app.post('/login_user', async (req, res) => {

  const { username, password } = req.body;

  try {
    const user = await Users.findOne({ username });


    if (!user) {
      res.render('Login', { message: "Invalid username pls Try Again!" });
    }

    if (user.Password == password) {
      res.render('Home');
    }
  }
  catch (err) {
    res.status(400).send("Invalid username or password!")
  }
});


app.post('/submit_data', async (req, res) => {
  try {
    // Create a new vehicle object using the form data
    const vehicle = new Vehicle({
      model: req.body.model,
      ccr: req.body.ccr,
      engine_type: req.body.engine_type,
      body_color: req.body.body_color,
      obl: req.body.obl,
      shift: req.body.shift,
      group: req.body.group,
      vin_no: req.body.vin,
      trim_date: req.body.trim_date,
      destination: req.body.destination,
      int_color: req.body.int_color,
      vqa: {
        pre_drive_1: {
          status: req.body.pre_drive_1,
          description: req.body.pre_drive_1_desc
        },
        tester: {
          status: req.body.tester,
          description: req.body.tester_desc
        },
        static: {
          status: req.body.static,
          description: req.body.static_desc
        },
        shower: {
          status: req.body.shower,
          description: req.body.shower_desc
        },
        dynamic: {
          status: req.body.dynamic,
          description: req.body.dynamic_desc
        },
        pesd_sample: {
          status: req.body.pesd_sample,
          description: req.body.pesd_sample_desc
        },
        temp_ok: {
          status: req.body.temp_ok,
          description: req.body.temp_ok_desc
        },
        kanken: {
          status: req.body.kanken,
          description: req.body.kanken_desc
        },
        final_ok_date: req.body.final_ok_date
      },
      fstr: {
        pre_drive_1: {
          status: req.body.fstr_pre_drive_1,
          description: req.body.fstr_pre_drive_1_desc
        },
        tester: {
          status: req.body.fstr_tester,
          description: req.body.fstr_tester_desc
        },
        static: {
          status: req.body.fstr_static,
          description: req.body.fstr_static_desc
        },
        shower: {
          status: req.body.fstr_shower,
          description: req.body.fstr_shower_desc
        },
        dynamic: {
          status: req.body.fstr_dynamic,
          description: req.body.fstr_dynamic_desc
        },
        pji_sample: {
          description: req.body.fstr_PJI_desc
        },
        // You can add other fields as necessar
      },
      DynamicInspection: {
        inspected_by: req.body.DI_inspected_by,
        static_check: req.body.DI_static_check,
        ltt: req.body.DI_ltt,
        concern_description: req.body.DI_concern,
        repair_details: req.body.DI_repair_details,
        repair_seal: req.body.DI_repair_seal,
        vqa_seal: req.body.DI_vqa_seal,
      },
      pesd_inspection: {
        concern_description: req.body.PESD_concern,
        repair_details: req.body.PESD_repair_details,
        prod_seal: req.body.PESD_PROD_seal,
        vqa_seal: req.body.PESD_vqa_seal,
      },
      temp_ok: {
        concern_description: req.body.Temp_concern,
        repair_details: req.body.Temp_repair_details,
        prod_seal: req.body.Temp_PROD_seal,
        vqa_seal: req.body.Temp_vqa_seal,
      },
      final_ok_check: {
        odo_meter: req.body.FI_Odo,
        wax: req.body.FI_WAX,
        bcm_siw: req.body.FI_BCM_SIW,
        audio: req.body.FI_Audio,
        battery: req.body.FI_Battery,
        concern_description: req.body.FI_concern,
        repair_details: req.body.FI_repair_details,
        prod_seal: req.body.FI_PROD_seal,
        vqa_seal: req.body.FI_vqa_seal,
      },
      qa_sampling: {
        concern_description: req.body.QA_concern,
        repair_details: req.body.QA_repair_details,
        repair_seal: req.body.QA_Repair_seal,
        vqa_seal: req.body.QA_vqa_seal,
      },
      other_description: {
        concern_description: req.body.Ot_concern,
        repair_details: req.body.Ot_repair_details,
        prod_seal: req.body.Ot_PROD_seal,
        vqa_seal: req.body.Ot_vqa_seal,
      },
    });

    // Save the vehicle data to the database
    await vehicle.save();
    res.render('Home', { message: 'Vehicle data submitted successfully!' });
  } catch (err) {
    console.error('Error saving vehicle data:', err);
    res.status(500).send('Error saving vehicle data');
  }
});


// Start the server
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
