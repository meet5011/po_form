import React, { useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import {
  Box,
  TextField,
} from "@mui/material";



export default function Form() {
  const [formData, setFormData] = useState({
    Name: "",
    hours: "",
    rate: "",
    startTime: "",
    endTime: "",
    supplier: "",
    purchaseOrders: "",
    poNumber :""
  });
  const [submit, setSubmit] = useState(false);
  const [filtered, setFiltered] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/suppliers")
      .then((res) => res.json())
      .then((data) => setSuppliers(data));
  },[]);            // eslint-disable-line react-hooks/exhaustive-deps

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDropdownChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handlepurchaseOrdersChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value,poNumber:suppliers.filter((s)=>{
      return s.supplier === formData.supplier
     })[0].poNumber});
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!Object.values(formData).includes("")) {
      setSubmit(true);
    }
   
  };

  useEffect(() => {
    setFiltered(suppliers.filter((item) => {
          return item.supplier === formData.supplier;
        })
        .flatMap((s) => {
          return s.desc;
        })
    )},[formData.supplier]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <form style={{ marginTop: "50px", marginBottom: "30px" }}>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { mt: 5, mr: 3, width: "35ch" },
          }}
          noValidate
          autoComplete="off"
          style={{ border: "1px solid black", width: "35%", margin: "auto" }}
        >
          <div>
            <TextField
              required
              id="outlined-required"
              label="Name"
              name="Name"
              value={formData.Name}
              onChange={handleInputChange}
            />
            <TextField
              required
              id="outlined-required"
              label="Start Time"
              name="startTime"
              type="time"
              InputLabelProps={{ shrink: true }}
              value={formData.startTime}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <TextField
              required
              id="outlined-required"
              label="End Time"
              InputLabelProps={{ shrink: true }}
              value={formData.endTime}
              name="endTime"
              type="time"
              onChange={handleInputChange}
            />
            <TextField
              required
              id="outlined-required"
              label="No. of hours worked"
              value={formData.hours}
              name="hours"
              type="number"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <TextField
              required
              id="outlined-required"
              label="Rate per hour"
              value={formData.rate}
              name="rate"
              type="number"
              onChange={handleInputChange}
            />
            <TextField
              id="outlined-select-currency"
              name="supplier"
              select
              label="Choose Supplier"
              //defaultValue="EUR"
              required
              value={formData.supplier}
              onChange={handleDropdownChange}
            >
              {suppliers.map((option) => {
                return (
                  <MenuItem value={option.supplier}>{option.supplier}</MenuItem>
                );
              })}
            </TextField>
          </div>
          <div>
            <TextField
              id="outlined-select-currency"
              select
              label="Choose PO"
              value={formData.purchaseOrders}
              style={{ width: "27vw" }}
              name="purchaseOrders"
              required
              onChange={handlepurchaseOrdersChange}
            >
              {filtered.map((option) => {
                return (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                );
              })}
            </TextField>
          </div>

          <button
            onClick={handleSubmit}
            color="primary"
            variant="contained"
            style={{ marginTop: "45px", marginBottom: "20px" }}
          >
            SUBMIT
          </button>
        </Box>
      </form>

      {submit && 
      <table style={{ width: "35%", margin: "auto" }}>
          <tr>
           <th>NAME</th>
           <th>Start time</th>
           <th>End time</th>
           <th>Working hours</th>
           <th>Rate per Hour</th>
           <th>Supplier</th>
           <th>Description</th>
           <th>PO Number</th>
          </tr>
          <tr>
         
          <td>{formData.Name}</td>
          <td>{formData.startTime}</td>
           <td>{formData.endTime}</td>
           <td>{formData.hours}</td>
           <td>{formData.rate}</td>
           <td>{formData.supplier}</td>
           <td>{formData.purchaseOrders}</td>
           <td>{formData.poNumber}</td>
          </tr>
          
        </table>
      }
    </div>
  );
}
