import React, { useState } from "react";
import { experiences, skills } from "../constants";
import { layout } from "../style";
import { motion } from "framer-motion";
import { BsLink45Deg } from "react-icons/bs";

export const SkillIcon = ({ icon, name }) => {
  return (
    <div className="flex flex-col">
      <span className="text-white text-[30px] hover:text-teal-200">
        {React.createElement(icon)}
      </span>
      <p className="font-poppins text-dimWhite text-[12px] mt-2">{name}</p>
    </div>
  );
};

const SkillCard = (props) => {
  const [showAll, setShowAll] = useState(false);
  const visibleItems = showAll ? props.items : props.items.slice(0, 3);

  return (
    <motion.div
      whileInView={{ y: [-20, 0], opacity: [0, 1] }}
      transition={{ duration: 1 }}
      className="mt-4 mb-6 border-l border-gray-200 dark:border-gray-700 mx-4"
    >
      <div className="relative w-3 h-3 bg-gray-200 rounded-full top-5 right-[6.2px] border dark:border-gray-900 dark:bg-gray-700"></div>
      <div className="flex flex-row items-center mb-6 ml-6">
        <h4 className="font-poppins font-semibold text-[20px] text-gradient leading-[32px]">
          {props.title}
        </h4>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-4 gap-8 ml-8">
        {visibleItems.map((item, index) => (
          <SkillIcon key={item.id} index={index} {...item} />
        ))}
      </div>
      {props.items.length > 1 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-4 ml-8 text-sm text-teal-400 hover:underline"
        >
          {showAll ? "See Less" : "See More"}
        </button>
      )}
    </motion.div>
  );
};

const Content = ({ text, link }) => {
  return (
    <div>
      <p className="font-poppins font-normal text-[14px] text-dimWhite mt-4">
        {text}{" "}
        {link ? (
          <a href={link} target="_blank">
            <BsLink45Deg size="1rem" className="inline hover:text-teal-200" />
          </a>
        ) : (
          ""
        )}
      </p>
    </div>
  );
};

const ExperienceCard = (props) => {
  const [showAllStates, setShowAllStates] = useState(
    props.positions.map(() => false)
  );

  const toggleShow = (index) => {
    const newStates = [...showAllStates];
    newStates[index] = !newStates[index];
    setShowAllStates(newStates);
  };

  return (
    <motion.div
      whileInView={{ y: [-20, 0], opacity: [0, 1] }}
      transition={{ duration: 1 }}
    >
      <div className="flex flex-row items-center mb-6">
        <img
          src={props.logo}
          alt={props.organisation}
          className="w-[52px] h-[52px] rounded-full z-[2]"
        />
        <h4 className="font-poppins font-semibold text-[20px] text-gradient leading-[32px] ml-2">
          {props.organisation}
        </h4>
      </div>
      <ol className="relative border-l border-gray-200 dark:border-gray-700 ml-6">
        {props.positions.map((position, idx) => {
          const showAllContent = showAllStates[idx];
          const visibleContent = showAllContent ? position.content : position.content.slice(0, 1);

          return (
            <li key={idx} className="mb-4 ml-4">
              <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {position.title}
              </h3>
              <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                {position.duration}
              </time>
              {visibleContent.map((info, index) => (
                <Content key={index} index={index} {...info} />
              ))}
              {position.content.length > 1 && (
                <button
                  onClick={() => toggleShow(idx)}
                  className="mt-2 text-sm text-teal-400 hover:underline"
                >
                  {showAllContent ? "See Less" : "See More"}
                </button>
              )}
            </li>
          );
        })}
      </ol>
    </motion.div>
  );
};

const SkillsAndExperience = () => {
  return (
    <section id="skills" className="mb-12">
      <h1 className="flex-1 md:-mb-10 font-poppins font-semibold ss:text-[55px] text-[45px] text-white ss:leading-[80px] leading-[80px]">
        Work I've Done
      </h1>
      <div className={layout.section}>
        {/* Experience */}
        <motion.div className="flex flex-1 md:mt-4 -ml-2 mr-2 items-center justify-start flex-col">
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} index={index} {...exp} />
          ))}
        </motion.div>

        {/* Skills */}
        <motion.div className={`mb-6 md:mt-0 md:ml-10 ${layout.sectionInfo}`}>
          {skills.map((skill, index) => (
            <SkillCard key={index} index={index} {...skill} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsAndExperience;
