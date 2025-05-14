import React from "react";
import { projects } from "../constants";
import { AiFillGithub } from "react-icons/ai";
import { BsLink45Deg } from "react-icons/bs";
import { motion } from "framer-motion";

const Project = ({ project, openModal }) => {
  return (
    <motion.div
      className="transition-colors duration-300 transform border rounded-xl hover:border-transparent group dark:border-gray-700 dark:hover:border-transparent feature-card p-6 cursor-pointer"
      initial={{ y: -30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: false, amount: 0.5 }}
      transition={{ duration: 0.75, delay: 0.1 }}
      onClick={() => openModal(project)}
    >
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-lg font-semibold text-white">{project.title}</h1>
        <div className="flex flex-row">
          {project.stack.map((tech) => (
            <div key={tech.id} className="text-dimWhite mr-2 text-[20px] hover:text-teal-200 tooltip">
              {React.createElement(tech.icon)}
              <span className="tooltiptext">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>

      {project.image ? (
        <img
          className="max-w-full h-auto max-h-60 mx-auto rounded-md mt-4"
          src={project.image}
          alt="Project Media"
        />
      ) : (
        <p className="mt-8 text-gray-500 dark:text-gray-300 group-hover:text-gray-300 font-poppins">
          {project.content}
        </p>
      )}

      <div className="flex mt-4">
        {project.github && (
          <a href={project.github} target="_blank" rel="noopener noreferrer">
            <AiFillGithub size="2rem" className="text-white mr-2 hover:text-teal-200" />
          </a>
        )}
        {project.link && (
          <a href={project.link} target="_blank" rel="noopener noreferrer">
            <BsLink45Deg size="2rem" className="text-white hover:text-teal-200" />
          </a>
        )}
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = React.useState(null);

  const openModal = (project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  React.useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <section id="projects">
      <h1 className="flex-1 -mb-4 font-poppins font-semibold ss:text-[55px] text-[45px] text-white ss:leading-[80px] leading-[80px]">
        Stuff I've Built
      </h1>

      <div className="container px-2 py-10 mx-auto mb-8">
        <div className="grid grid-cols-1 gap-8 mt-4 md:mt-4 md:grid-cols-2">
          {projects.map((project) => (
            <Project key={project.id} project={project} openModal={openModal} />
          ))}
        </div>
      </div>

      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-primary py-10 px-10 rounded-xl w-full max-w-lg mx-auto relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white text-2xl hover:text-red-400"
            >
              ✖
            </button>
            {selectedProject.image && (
              <img
                src={selectedProject.image}
                alt="Project GIF"
                className="rounded-md mb-4 w-full h-48 object-contain"
              />
            )}
            <h2 className="text-white text-2xl font-bold mb-4 text-center px-0">
              {selectedProject.title}
            </h2>
            <p className="text-dimWhite text-sm px-2">
              {selectedProject.content}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;