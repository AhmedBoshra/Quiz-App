import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  username: z.string().min(5),
  password: z.string().min(5),
  userType: z.enum(["teacher", "student", "admin"]),
});

type FormData = z.infer<typeof schema>;

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const onSubmit = (data: FieldValues) => console.log(data);

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
            {/* username  */}
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

            {/* password */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                {...register("password")}
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
                {...register("userType")}
                className="form-select form-select-lg border-primary"
                id="userType"
                style={{
                  backgroundColor: "#f8f9fa",
                  border: "1px solid #ced4da",
                  padding: "0.5rem",
                }}
              >
                <option value="">Select usertype</option>
                <option value="teacher">Teacher</option>
                <option value="student">Student</option>
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
        </div>
      </div>
    </div>
  );
};

export default Form;
