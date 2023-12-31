import "../styles/styles.css";
import closed from "../assets/closed-eye.svg";
import opened from "../assets/opened-eye.svg";
import useLoginLogic from "../hooks/useLoginLogic";

const Login = () => {
  const {
    userDetails,
    showPassword,
    validateUser,
    setUserDetails,
    continueAsGuest,
    setShowPassword,
  } = useLoginLogic();

  return (
    <div className="login-wrapper">
      <div className="login-left">
        <h1>HNGx</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            validateUser();
          }}
        >
          {[
            { label: "email", placeholder: "example@gmail.com" },
            { label: "password", placeholder: "*****" },
          ].map((item) => (
            <div key={item.label}>
              <label htmlFor={item.label}>{item.label}</label>
              <div>
                <input
                  type={`${showPassword ? "text" : item.label}`}
                  required
                  id={item.label}
                  minLength={item.label === 'password' ? 6 : null}
                  placeholder={item.placeholder}
                  value={userDetails[item.label]}
                  onChange={(e) =>
                    setUserDetails({
                      ...userDetails,
                      [item.label]: e.target.value,
                    })
                  }
                />
                {item.label === "password" ? (
                  <img
                    src={showPassword ? closed : opened}
                    alt={`${showPassword ? closed : opened} eye icon`}
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : null}
              </div>
            </div>
          ))}
          <div className="authenticate">
            <button type="submit">Log in</button>
            <p>or</p>
            <button onClick={continueAsGuest}>Continue as guest</button>
          </div>
        </form>
      </div>
      <div className="login-right"></div>
    </div>
  );
};

export default Login;
