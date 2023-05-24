import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect, useState } from "react";

const schema = z.object({
  username: z.string().min(5),
  password: z.string().min(5),
  userType: z.enum(["admin"]),
});

type FormData = z.infer<typeof schema>;

const CreateAdmin = () => {
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FieldValues) => {
    // Sending data to the database
    try {
      await axios.post("http://localhost:3000/api/signup", data);
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 2000);
      console.log("Form submitted successfully");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div
      className="container"
      style={{ backgroundColor: "#f2f2f2", padding: "20px", margin: "0 auto" }}
    >
      <div className="row justify-content-center">
        <div className="col-lg-6">
          {/* Form Beginning */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              padding: "20px",
            }}
          >
            {/* Username */}
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Username
              </label>
              <input
                {...register("username")}
                id="name"
                type="text"
                className="form-control border-primary"
              />
              {errors.username && (
                <p className="text-danger">{errors.username.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                {...register("password", { required: true })}
                id="password"
                type="password"
                className="form-control border-primary"
              />
              {errors.password && (
                <p className="text-danger">{errors.password.message}</p>
              )}
            </div>

            {/* usertype selection */}
            <div className="mb-3">
              <label htmlFor="userType" className="form-label">
                Select Usertype
              </label>
              <select
                {...register("userType", { required: true })}
                className="form-select form-select-lg border-primary"
                id="userType"
                style={{
                  backgroundColor: "#f8f9fa",
                  border: "1px solid #ced4da",
                  padding: "0.5rem",
                }}
              >
                <option value="admin">Admin</option>
              </select>
              {errors.userType && (
                <p className="text-danger">{errors.userType.message}</p>
              )}
            </div>

            {/* Button */}
            <div className="text-center">
              <button
                disabled={!isValid}
                className="btn btn-primary"
                type="submit"
                style={{ marginTop: "10px" }}
              >
                Submit
              </button>
            </div>
          </form>
          {/* Display success message if form submitted successfully */}
          {submitSuccess && (
            <div className="text-success mt-3">Admin created successfully!</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateAdmin;
