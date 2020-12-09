import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ProfileCard from "./ProfileCard";
import About from "./About";
export default function Profile() {
  const router = useRouter();
  const [profileCard, setProfileCard] = useState({});
  const [aboutInfo, setAboutInfo] = useState({});
  useEffect(() => {
    if (router.query) {
      console.log("router.query ", router.query);
      setProfileCard({
        co: router.query.co,
        ci: router.query.ci,
        n: router.query.n,
        photo: router.query._,
        b: router.query.b,
        timeScore: router.query.timeScore
      });
      setAboutInfo({
        id: router.query.i,
        co: router.query.co,
        ci: router.query.ci,
        va: router.query.va
      });
    }
  }, []);

  return (
    <>
      <div className="profile-container">
        <ProfileCard mainInfo={profileCard} />

        {aboutInfo.id && <About aboutInfo={aboutInfo} />}
      </div>
    </>
  );
}
