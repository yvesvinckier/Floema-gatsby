import React, { useRef } from "react";
import { Link } from "gatsby";
import { useStaticQuery, graphql } from "gatsby";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLocation } from "@reach/router";

import { split } from "../../utils/text";
import { DEFAULT as ease } from "../../utils/easing";

const LinkAnimation = ({ link, text }) => {
  const element = useRef();

  useGSAP(() => {
    if (element.current.children.length === 0) return;

    const text = element.current.children[0].textContent;

    const textElement = document.createElement("div");
    textElement.innerHTML = text;
    const textSpans = split({
      append: false,
      element: textElement,
      expression: "",
    });

    const hoverElement = document.createElement("div");
    hoverElement.innerHTML = text;
    const hoverSpans = split({
      append: false,
      element: hoverElement,
      expression: "",
    });

    element.current.innerHTML = "";
    element.current.appendChild(textElement);
    element.current.appendChild(hoverElement);

    gsap.set(hoverElement, { position: "absolute", top: 0, left: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(
      textSpans,
      {
        ease,
        transform: "rotate3d(1, 0.2, 0, -90deg)",
        stagger: 0.02,
      },
      0
    );

    tl.fromTo(
      hoverSpans,
      {
        transform: "rotate3d(1, 0.2, 0, 90deg)",
      },
      {
        ease,
        transform: "rotate3d(0, 0, 0, 90deg)",
        stagger: 0.02,
      },
      0.05
    );

    const onMouseEnter = () => tl.play();

    const onMouseLeave = () => tl.reverse();

    element.current.addEventListener("mouseenter", onMouseEnter);
    element.current.addEventListener("mouseleave", onMouseLeave);
  }, []);

  return (
    <Link
      to={`/${link}/`}
      className="navigation__list__link"
      data-animation="link"
      ref={element}
    >
      <span>{text}</span>
    </Link>
  );
};

const Navigation = () => {
  const navigation = useRef();
  const navigationItems = useRef([]);
  const location = useLocation();

  const data = useStaticQuery(graphql`
    query {
      prismicNavigation {
        data {
          list {
            text
            link {
              slug
            }
          }
        }
      }
    }
  `);

  useGSAP(
    () => {
      if (location.pathname === "/about/") {
        gsap.set(navigation.current, { color: "#37384C" });
        gsap.set(navigationItems.current[0], { autoAlpha: 1 });
        gsap.set(navigationItems.current[1], { autoAlpha: 0 });
      } else {
        gsap.set(navigation.current, { color: "#F9F1E7" });
        gsap.set(navigationItems.current[0], { autoAlpha: 0 });
        gsap.set(navigationItems.current[1], { autoAlpha: 1 });
      }
    },
    { dependencies: [location.pathname] }
  );

  return (
    <nav className="navigation" ref={navigation}>
      <Link to="/" className="navigation__link">
        Floema Jewelry
        <svg
          className="navigation__link__icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 128.01 20.01"
        >
          <path
            fill="currentColor"
            d="M48.67,16.19c-1.11,0.04-2.22-0.14-3.26-0.53c-0.74-0.33-1.55-0.52-2.36-0.55l0,0l-1.25-0.06 c-0.26,0-0.5-0.13-0.65-0.34c-0.4-0.61-0.02-1.83,0.4-2.95c0.26-0.68-0.66-1.22-1.7-1.75c-1.11-0.57-1.08-0.79-0.48-2.64 c0.26-1.23,1.17-2.22,2.38-2.58l0.13-0.06c0.7-0.4,1.18-1.1,1.29-1.9c0.04-0.13,0.07-0.25,0.11-0.35c0.18-0.49,0.98-0.96,1.82-1.4 l0.11-0.06c0.48-0.25,3.25-0.5,3.86,0.46c0.41,0.56,0.95,1.01,1.58,1.31c0.18,0.1,0.35,0.2,0.49,0.3c1.3,0.99,2.22,2.41,2.58,4.01 c0.22,1.7,0.2,2.56-0.45,3.12c-0.54,0.4-0.91,1-1.03,1.66c0.01,0.58-0.16,1.14-0.49,1.62c-0.35,0.46-0.64,0.97-0.87,1.51 C50.6,15.66,50,16.1,49.3,16.17C49.09,16.19,48.88,16.2,48.67,16.19z M43.06,14.8c0.86,0.03,1.71,0.23,2.49,0.59 c1.19,0.4,2.45,0.56,3.7,0.47c0.59-0.05,1.1-0.42,1.34-0.97c0.23-0.56,0.53-1.09,0.9-1.57c0.29-0.43,0.44-0.94,0.43-1.46 c0.12-0.75,0.52-1.43,1.14-1.88c0.5-0.43,0.58-1.04,0.35-2.85c-0.35-1.51-1.21-2.85-2.44-3.79c-0.14-0.09-0.3-0.19-0.47-0.29 c-0.67-0.32-1.25-0.81-1.68-1.41c-0.48-0.77-3.05-0.56-3.45-0.35l-0.11,0.06c-0.45,0.24-1.51,0.78-1.67,1.23 c-0.03,0.09-0.06,0.2-0.1,0.33c-0.14,0.89-0.68,1.66-1.47,2.1l-0.14,0.06c-1.12,0.32-1.97,1.24-2.21,2.39 c-0.59,1.8-0.58,1.81,0.32,2.27c0.88,0.45,2.22,1.14,1.84,2.13c-0.22,0.58-0.8,2.11-0.43,2.67c0.09,0.13,0.25,0.21,0.41,0.2 L43.06,14.8z M45.68,20c-0.72,0.09-1.43-0.26-1.81-0.88c-0.03-0.04-0.05-0.08-0.07-0.11l-0.11-0.14c-0.43-0.53-0.88-1.04-1.37-1.52 c-0.26-0.3-0.42-0.68-0.45-1.08c-0.02-0.14-0.06-0.27-0.11-0.4c-0.03-0.05-0.1-0.15-0.2-0.3c-0.53-0.72-0.97-1.5-1.31-2.33 c-0.09-0.64-0.05-1.3,0.13-1.93c0.07-0.28,0.11-0.56,0.12-0.84c-0.12-0.54-0.32-1.07-0.59-1.55c-0.45-0.6-0.51-1.41-0.15-2.07 c0.57-1.3,0.88-1.99,1.27-2.23c0.35-0.22,1.49-0.81,1.53-0.83l0.02-0.01c0.39-0.16,0.7-0.46,0.88-0.85c0.06-0.1,0.13-0.21,0.2-0.31 c0.07-0.1,0.13-0.21,0.19-0.32c0.15-0.28,0.23-0.4,0.87-0.7c0.98-0.24,2-0.23,2.96,0.05c0.19,0.04,0.38,0.07,0.57,0.09 c0.94,0.21,1.85,0.52,2.71,0.93l0.23,0.09c0.75,0.38,1.43,0.87,2.03,1.45c0.29,0.29,0.64,0.52,1.03,0.66 c0.17,0.08,0.35,0.16,0.52,0.26c0.57,0.33,1.21,0.87,1.29,1.38C56.08,6.6,56.1,6.7,56.12,6.8c0.14,0.69,0.22,1.4,0.26,2.11 c0.15,0.99,0.01,2-0.42,2.9c-0.32,0.6-0.55,1.25-0.68,1.91c-0.26,0.95-0.81,1.8-1.57,2.43c-0.52,0.63-1.22,1.1-2,1.35 c-0.1,0.03-0.2,0.07-0.32,0.11c-0.15,0.06-0.28,0.09-0.38,0.13c-0.43,0.14-0.59,0.18-1.56,1.13c-0.87,0.85-1.01,0.89-1.73,0.92 c-0.42,0.02-0.85,0.06-1.27,0.12C46.2,19.97,45.94,19.99,45.68,20z M42.69,4.07c-0.11,0.06-1.18,0.61-1.5,0.82 c-0.52,0.61-0.92,1.32-1.15,2.09c-0.3,0.55-0.27,1.23,0.09,1.74c0.32,0.53,0.55,1.12,0.67,1.73c-0.01,0.31-0.05,0.62-0.13,0.92 c-0.17,0.58-0.21,1.19-0.13,1.79c0.33,0.79,0.75,1.54,1.26,2.24c0.1,0.15,0.18,0.26,0.21,0.32c0.07,0.16,0.12,0.32,0.14,0.49 c0.03,0.33,0.15,0.64,0.34,0.9c0.51,0.49,0.98,1.01,1.42,1.57l0.11,0.14c0.04,0.04,0.07,0.09,0.1,0.14 c0.21,0.33,0.61,0.94,2.27,0.68c0.43-0.07,0.86-0.11,1.3-0.13c0.65-0.03,0.72-0.04,1.54-0.83c1.01-1,1.21-1.06,1.68-1.21 c0.1-0.03,0.22-0.07,0.37-0.12c0.12-0.04,0.22-0.08,0.32-0.11c0.74-0.24,1.39-0.69,1.88-1.29c0.72-0.59,1.24-1.39,1.49-2.28 c0.14-0.7,0.38-1.37,0.71-1.99c0.4-0.85,0.54-1.81,0.39-2.74c-0.03-0.69-0.12-1.39-0.25-2.07c-0.02-0.11-0.04-0.21-0.06-0.3 c-0.06-0.38-0.62-0.86-1.14-1.16c-0.15-0.09-0.32-0.16-0.49-0.24c-0.43-0.16-0.81-0.41-1.13-0.74c-0.57-0.55-1.21-1.01-1.91-1.37 l-0.23-0.09c-0.83-0.38-1.7-0.68-2.59-0.9c-0.22-0.02-0.43-0.05-0.64-0.09c-0.91-0.26-1.86-0.28-2.78-0.07 c-0.57,0.27-0.61,0.34-0.73,0.56c-0.06,0.12-0.13,0.24-0.21,0.35C43.85,2.91,43.79,3,43.73,3.1C43.52,3.54,43.15,3.89,42.69,4.07z  M46.95,14.61c-0.36-0.01-0.72-0.08-1.07-0.2l-0.17-0.05c-1.03-0.48-1.98-1.12-2.81-1.89c-0.21-0.21-0.37-0.47-0.46-0.75 c-0.19-0.52-0.5-0.99-0.92-1.36c-1-1.02-1.11-1.42-1.2-1.71c-0.02-0.06-0.03-0.11-0.06-0.16c-0.06-0.16-0.04-0.34,0.03-0.49 c0.36-0.68,0.97-1.2,1.71-1.45c0.7-0.29,1.12-1,1.02-1.75l-0.02-0.12l0.03-0.01c0.01-0.11,0.03-0.36,0.08-0.92 c0.08-1.01,0.93-1.55,2.6-1.65c1.51-0.09,2.15,0.05,2.71,0.61c0.47,0.51,1.02,0.93,1.64,1.25c0.2,0.09,0.47,0.18,0.75,0.27 c0.52,0.13,1.02,0.35,1.47,0.63c0.59,0.46,0.54,1.18,0.4,2.53l-0.03,0.25c0.01,0.56-0.1,1.11-0.3,1.62 c-0.12,0.22-0.27,0.42-0.44,0.59c-0.49,0.55-0.9,1.18-1.2,1.86c-0.12,0.38-0.32,0.72-0.58,1.02l-0.03,0.03 c-0.1,0.09-0.21,0.17-0.33,0.24c-0.48,0.32-0.93,0.67-1.36,1.05C48.03,14.42,47.5,14.62,46.95,14.61z M43.34,4.75 c0.1,0.88-0.39,1.73-1.21,2.07c-0.66,0.22-1.21,0.67-1.54,1.28c-0.04,0.08-0.05,0.17-0.04,0.26c0.03,0.07,0.05,0.13,0.07,0.2 c0.08,0.26,0.18,0.61,1.13,1.58c0.44,0.4,0.78,0.91,0.98,1.47c0.07,0.24,0.2,0.47,0.39,0.64c0.79,0.74,1.69,1.35,2.67,1.81 c0.06,0.01,0.11,0.03,0.18,0.05c0.75,0.34,1.62,0.22,2.25-0.31c0.44-0.38,0.91-0.74,1.39-1.07c0.1-0.06,0.19-0.13,0.28-0.21 l0.04-0.03c0.1-0.1,0.19-0.18,0.52-0.92c0.32-0.7,0.74-1.35,1.26-1.93c0.15-0.16,0.28-0.33,0.39-0.52c0.19-0.49,0.28-1.01,0.27-1.53 l0.03-0.25c0.14-1.37,0.16-1.92-0.29-2.26c-0.43-0.26-0.89-0.46-1.38-0.58c-0.27-0.08-0.53-0.17-0.79-0.28 c-0.65-0.33-1.23-0.78-1.73-1.31c-0.49-0.49-1.07-0.61-2.48-0.53c-1.51,0.09-2.24,0.53-2.31,1.37C43.39,4.33,43.36,4.61,43.34,4.75 L43.34,4.75z M47.69,18.5c-0.23,0.02-0.46-0.04-0.65-0.16c-0.25-0.22-0.49-0.46-0.71-0.72c-0.55-0.61-1.31-1.44-1.87-1.39 c-0.7-0.02-1.36-0.31-1.84-0.81c-0.6-0.54-0.93-1.32-0.9-2.12c0.02-0.93-0.55-1.78-1.43-2.1c-0.07-0.03-0.14-0.07-0.2-0.11 c-0.04-0.03-0.09-0.05-0.13-0.08c-0.71-0.3-1.18-0.99-1.2-1.76c0-1.16,0-3.56,1.38-3.89c0.17-0.04,0.35-0.08,0.52-0.12 c0.96-0.22,1.87-0.42,2.13-0.79c0.07-0.1,0.12-0.2,0.17-0.31c0.18-0.37,0.36-0.75,1.46-1.01l1.31-0.31c0.49-0.4,0.85-0.93,1.06-1.53 c0.4-1.14,1.06-1.27,1.51-1.27c0.04,0,0.12,0,0.22-0.01c1.37-0.05,2.99-0.04,3.36,0.53c0.16,0.27,0.3,0.55,0.43,0.83 c0.36,0.76,0.8,1.72,1.39,2c1.02,0.57,1.86,1.42,2.41,2.44c0.06,0.14,0.14,0.28,0.23,0.43c0.61,0.82,0.75,1.91,0.37,2.86 c-0.33,1.01-0.94,1.9-1.78,2.56c-0.49,0.45-0.75,1.11-0.69,1.78c0.01,0.15-0.01,0.31-0.04,0.46c-0.02,0.07-0.03,0.13-0.04,0.2 c-0.06,0.47-0.17,1.25-1.79,2.45C51.02,17.61,49.4,18.27,47.69,18.5z M44.52,15.92c0.69,0,1.44,0.83,2.04,1.49 c0.21,0.24,0.43,0.47,0.67,0.68c0.53,0.41,3.14-0.41,4.98-1.77c1.52-1.12,1.61-1.8,1.67-2.24c0.01-0.08,0.02-0.16,0.04-0.24 c0.02-0.13,0.03-0.25,0.03-0.38c-0.06-0.75,0.23-1.49,0.79-2c0.8-0.63,1.39-1.49,1.7-2.46c0.34-0.86,0.21-1.85-0.36-2.59 c-0.09-0.16-0.18-0.31-0.24-0.45c-0.53-0.96-1.31-1.76-2.27-2.3c-0.72-0.54-1.25-1.29-1.54-2.14c-0.12-0.27-0.25-0.54-0.4-0.8 c-0.22-0.33-1.26-0.47-3.09-0.39c-0.11,0-0.19,0.01-0.23,0.01c-0.25,0-0.85,0-1.23,1.07c-0.23,0.67-0.64,1.26-1.2,1.7l-0.05,0.02 l-1.34,0.31c-0.96,0.22-1.08,0.5-1.25,0.84c-0.06,0.12-0.12,0.24-0.2,0.36C42.7,5.1,41.78,5.3,40.72,5.54L40.2,5.66 c-1.14,0.27-1.14,2.59-1.14,3.59c0.02,0.66,0.43,1.24,1.04,1.49c0.07,0.03,0.13,0.07,0.19,0.11c0.04,0.03,0.09,0.05,0.14,0.07 c0.99,0.38,1.63,1.34,1.6,2.39c-0.02,0.72,0.28,1.4,0.81,1.88c0.42,0.44,0.99,0.7,1.6,0.72C44.46,15.92,44.49,15.92,44.52,15.92z  M45.65,18.52c-0.17-0.01-0.33-0.04-0.49-0.09c-0.44-0.12-0.9-0.2-1.36-0.24c-0.87-0.04-1.65-0.55-2.04-1.32v-0.01l-0.4-1.1 c-0.49-0.63-0.71-1.43-0.6-2.22v-0.08c0.15-0.7-0.1-1.42-0.64-1.88c-0.94-1.09-0.94-2.06,0.01-2.95c0.41-0.33,0.67-0.8,0.74-1.32 c0-0.22,0.1-0.43,0.27-0.57c0.42-0.45,0.78-0.96,1.08-1.51c0.14-2.11,0.29-2.42,0.38-2.48c2.79-2.68,5.47-1.62,5.5-1.61 c0.68,0.41,1.32,0.89,1.92,1.42c0.18,0.13,0.38,0.22,0.6,0.26c0.5,0.11,0.97,0.36,1.32,0.73c0.62,0.67,1.39,0.53,2.66,0.29 l0.11-0.02c1.36-0.25,1.81,1.1,2.2,2.29c0.05,0.14,0.09,0.28,0.14,0.41c0.37,1.07-0.2,1.53-0.81,2.03 c-0.23,0.18-0.45,0.37-0.65,0.58c-0.42,0.48-0.56,1.15-0.35,1.75c0.05,0.24,0.07,0.47,0.08,0.71c0.01,0.27-0.04,0.53-0.15,0.77 c-0.13,0.31-0.2,0.64-0.19,0.98c-0.05,1.12-0.29,1.38-0.54,1.65l-0.07,0.07c-0.29,0.23-0.61,0.41-0.96,0.54 c-0.37,0.16-0.73,0.35-1.07,0.56c-0.62,0.38-1.29,0.67-1.99,0.86l-0.22,0.07c-0.16,0.06-0.31,0.13-0.45,0.22 c-0.43,0.27-0.93,0.42-1.44,0.42c-0.6,0.05-1.17,0.22-1.7,0.5c-0.2,0.11-0.42,0.19-0.64,0.25C45.83,18.51,45.74,18.52,45.65,18.52z  M42.05,16.76c0.35,0.67,1.03,1.1,1.78,1.13c0.48,0.04,0.95,0.12,1.41,0.25c0.19,0.07,0.4,0.09,0.6,0.06 c0.2-0.05,0.39-0.13,0.58-0.23c0.56-0.3,1.18-0.48,1.82-0.53c0.46,0.01,0.91-0.13,1.3-0.38c0.16-0.1,0.33-0.19,0.51-0.25l0.22-0.07 c0.67-0.19,1.31-0.47,1.91-0.82c0.35-0.23,0.73-0.42,1.11-0.59c0.31-0.12,0.59-0.28,0.86-0.47l0.07-0.08 c0.22-0.24,0.41-0.44,0.46-1.46c0-0.37,0.07-0.74,0.22-1.08c0.1-0.2,0.14-0.43,0.12-0.65c-0.01-0.22-0.03-0.44-0.08-0.66 c-0.22-0.7-0.06-1.47,0.43-2.01c0.21-0.22,0.44-0.42,0.68-0.61c0.61-0.49,1.01-0.82,0.71-1.69c-0.05-0.14-0.09-0.28-0.14-0.42 c-0.39-1.18-0.76-2.29-1.86-2.08l-0.11,0.02c-1.32,0.25-2.2,0.41-2.94-0.38c-0.32-0.33-0.73-0.55-1.18-0.64 c-0.26-0.05-0.51-0.17-0.72-0.33c-0.57-0.5-1.18-0.96-1.83-1.36c-0.03-0.01-2.57-0.94-5.18,1.56c-0.2,0.75-0.29,1.53-0.29,2.31 l-0.02,0.07C42.19,5.96,41.79,6.51,41.33,7c-0.1,0.07-0.12,0.17-0.15,0.37c-0.07,0.59-0.37,1.13-0.83,1.5 c-0.83,0.78-0.83,1.56,0.01,2.53c0.59,0.52,0.86,1.32,0.71,2.09v0.08c-0.11,0.74,0.1,1.5,0.57,2.08L42.05,16.76z M120.36,2.64h0.06 l3.52,9.47h-7.15L120.36,2.64z M126.6,19.23h1.41l-6.93-18.54h-0.91l-7.12,18.54h1.04l2.38-6.27h7.79L126.6,19.23z M88.38,19.23 V1.86h0.05l6.35,17.33h1.01l6.41-17.31h0.05v17.33h1.34V0.82h-1.87l-6.16,16.46h-0.03L89.42,0.82h-1.97v18.41H88.38z M67.12,0.82 v18.41h10.83v-0.85h-9.49v-8.33h6.43V9.2h-6.43V1.68h8.72V0.82H67.12z M21.42,0.82h-1.33v18.41h10.94v-0.85h-9.61L21.42,0.82z  M0,0.82v18.41h1.34v-9.05h6.4V9.33h-6.4V1.68h9.34V0.82H0z"
          ></path>
        </svg>
      </Link>

      <ul className="navgation__list">
        {data.prismicNavigation.data.list.map((item, index) => (
          // console.log(item.link.slug)
          <li
            key={index}
            className="navigation__list__item"
            ref={(el) => navigationItems.current.push(el)}
          >
            <LinkAnimation link={item.link.slug} text={item.text} />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
