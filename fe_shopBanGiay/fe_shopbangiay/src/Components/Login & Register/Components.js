import styled from 'styled-components';

export const Wrapper = styled.div`
  min-height: calc(100vh - 80px); 
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
`;

export const Container = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
              0 10px 10px rgba(0, 0, 0, 0.22);
  width: 900px;
  max-width: 100%;
  height: 550px;
  position: relative;
  overflow: hidden;
  display: flex;
`;

export const SignUpContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
  transition: all 0.6s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;

  ${props => !props.signinIn && `
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
  `}
`;

export const SignInContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  left: 0;
  width: 50%;
  z-index: 2;
  transition: all 0.6s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;

  ${props => !props.signinIn && `
    transform: translateX(100%);
  `}
`;

export const Form = styled.form`
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  width: 100%;
  text-align: center;
`;

export const Title = styled.h1`
  font-weight: bold;
  margin: 0;
`;

export const Input = styled.input`
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
  max-width: 300px;
  box-sizing: border-box;
`;

export const Button = styled.button`
  border-radius: 20px;
  border: 1px solid #eca5b5;
  background-color: #eca5b5;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  margin-top: 10px;
  width: 100%;
  max-width: 300px;

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
  }
`;


export const GhostButton = styled(Button)`
  background-color: transparent;
  border-color: #ffffff;
`;

export const Anchor = styled.a`
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
`;

export const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;

  ${props => !props.signinIn && `
    transform: translateX(-100%);
  `}
`;

export const Overlay = styled.div`
  background: linear-gradient(to right, #FFE1FF, #f58282);
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;

  ${props => !props.signinIn && `
    transform: translateX(50%);
  `}
`;

export const OverlayPanel = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
`;

export const LeftOverlayPanel = styled(OverlayPanel)`
  transform: translateX(-20%);
  ${props => !props.signinIn && `transform: translateX(0);`}
`;

export const RightOverlayPanel = styled(OverlayPanel)`
  right: 0;
  transform: translateX(0);
  ${props => !props.signinIn && `transform: translateX(20%);`}
`;

export const Paragraph = styled.p`
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
`;

export const SocialContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin: 20px 0;
`;

export const SocialButton = styled.button`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  border: 1px solid #ddd;
  background-color: #fff;
  color: ${props =>
    props.provider === "facebook"
        ? "#3b5998"
        : props.provider === "google"
            ? "#db4437"
            : "#555"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #f1f1f1;
    transform: scale(1.0);
  }

  i {
    font-size: 18px;
  }
`;
