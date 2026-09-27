import React from "react";
import "../styles/sponsormarquee.css";

export const SponsorMarquee: React.FC = () => {
  const sponsors = [
    { id: "1", name: "SPONSOR 1", tier: "Title Partner" },
    { id: "2", name: "SPONSOR 2", tier: "Gold Partner" },
    { id: "3", name: "SPONSOR 3", tier: "Silver Partner" },
    { id: "4", name: "SPONSOR 4", tier: "Associate Partner" },
  ];

  return (
    <div className="marquee-container">
      <div className="marquee-mask-left"></div>
      <div className="marquee-mask-right"></div>

      <div className="marquee-inner">
        <span className="marquee-label">
          OFFICIAL PARTNERS
        </span>

        <div className="marquee-scroll-wrapper">
          <div className="marquee-track">
            {[...sponsors, ...sponsors, ...sponsors, ...sponsors].map((sponsor, idx) => (
              <div key={idx} className="sponsor-item-card">
                <div className="sponsor-logo-box">
                  {`SPONSOR ${sponsor.id} LOGO`}
                </div>
                <div className="sponsor-details">
                  <span className="sponsor-name-text">{sponsor.name}</span>
                  <span className="sponsor-tier-text">{sponsor.tier}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
