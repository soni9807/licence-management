import React from "react";
const Footer = () => {
  return (
    <div className="footer">
      <div>
        <a
          href="https://securonix.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Securonix
        </a>
        <span className="ms-1">© 2022 Securonix.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a
          href="https://securonix.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Snypr Operations Management Console &amp; Cloud Service Engineering -
          Team Devops
        </a>
      </div>
    </div>
  );
};

export default Footer;
