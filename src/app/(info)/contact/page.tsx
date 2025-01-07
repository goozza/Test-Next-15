import React from "react";

const ContactPage = async () => {
  return (
    <div style={{ width: "100%", height: "100vh", overflow: "hidden" }}>
      <iframe
        data-cookieconsent="token"
        src="https://dev-oneportal.inet.co.th/"
        style={{ width: "100%", height: "100%", border: "none" }}
        title="OnePortal"
      ></iframe>
    </div>
  );
};

export default ContactPage;
