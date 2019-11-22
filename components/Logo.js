import React from "react";
import Link from "next/link";

function Logo(props) {
  return (
    <div>
      <Link href={`/${props.locale}`}>
        <a>
          <img
            src="/patterson_logo.png"
            className="logo"
            alt="patterson-logo"
          />
        </a>
      </Link>
      <style jsx>{`
        .logo {
          width: 175px;
        }
      `}</style>
    </div>
  );
}

export default Logo;
