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
      setProfileCard({
        co: router.query.co,
        ci: router.query.ci,
        n: router.query.n,
        photo: router.query._,
        b: router.query.b
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
      <ProfileCard mainInfo={profileCard} />
      <br />
      <br />
      {aboutInfo.id && <About aboutInfo={aboutInfo} />}
      <br />
    </>
  );
}
