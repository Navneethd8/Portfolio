import Link from "next/link";
import SiteLayout from "@/components/siteLayout"
import { FaLinkedin,FaGithub,FaXTwitter } from 'react-icons/fa6';
import { CgWebsite } from "react-icons/cg";
import { MdEmail } from "react-icons/md";


export default function Home() {
  return (
    <SiteLayout
      sidebar={
        <div className="flex flex-col h-full w-full">
          <div className="flex-shrink-0 mb-4">
              <h1 className="text-2xl font-semibold mb-2 text-[var(--background)]">Navneeth Dhamotharan</h1>
              <p className="text-[var(--background)] text-xl">Aspiring Data / Software Engineer</p>
          </div>

          <div className="flex flex-col gap-4">
            <nav 
              className="
                  flex
                  gap-2
                  flex-row 
                  overflow-x-auto 
                  whitespace-nowrap 
                  
                  lg:flex-col 
                  lg:overflow-visible 
                  lg:whitespace-normal
                  lg:pr-2
                  lg:flex-grow

                  "
            >
              <a href="#about" className="px-4 py-1 text-xl text-[var(--link)] hover:text-[var(--link-hover)]">
                About
              </a>
              <a href="#education" className="px-4 py-1 text-xl text-[var(--link)] hover:text-[var(--link-hover)]">
                Education
              </a>
              <a href="#experience" className="px-4 py-1 text-xl text-[var(--link)] hover:text-[var(--link-hover)]">
                Experience
              </a>
              <a href="#skills" className="px-4 py-1 text-xl text-[var(--link)] hover:text-[var(--link-hover)]">
                Skills
              </a>
              <a href="#projects" className="px-4 py-1 text-xl text-[var(--link)] hover:text-[var(--link-hover)]">
                Projects
              </a>
              <a href="#resume" className="px-4 py-1 text-xl text-[var(--link)] hover:text-[var(--link-hover)]">
                Resume
              </a>
            </nav>

            <div>
              <p className="text-[var(--background)] text-xl">Let's Connect!</p>
            </div>
            <nav 
              className="
                  flex
                  gap-2
                  justify-center
                  flex-row 
                  overflow-x-auto 
                  whitespace-nowrap 

                  
                  lg:flex-col 
                  lg:overflow-visible 
                  lg:whitespace-normal
                  lg:pr-2
                  lg:flex-grow

                  "
            >
              <a href="mailto:nd17@uw.edu" className="px-4 py-1 text-xl flex flex-row items-center gap-2 text-[var(--background)] hover:text-[var(--link-hover)]">
                <MdEmail />
                <span className="hidden lg:inline">nd17@uw.edu</span>
              </a>

              <a href="https://www.linkedin.com/in/navneethd" target="_blank" rel="noopener noreferrer" className="px-4 py-1 text-xl flex flex-row items-center gap-2 text-[var(--background)] hover:text-[var(--link-hover)]">
                <FaLinkedin />
                <span className="hidden lg:inline">LinkedIn</span>
              </a>

              <a href="https://github.com/navneethd8" target="_blank" rel="noopener noreferrer" className="px-4 py-1 text-xl flex flex-row items-center gap-2 text-[var(--background)] hover:text-[var(--link-hover)]">
                <FaGithub />
                <span className="hidden lg:inline">GitHub</span>
              </a>

              <a href="https://navneeth.vercel.app" target="_blank" rel="noopener noreferrer" className="px-4 py-1 text-xl flex flex-row items-center gap-2 text-[var(--background)] hover:text-[var(--link-hover)]">
                <CgWebsite />
                <span className="hidden lg:inline">Website</span>
              </a>

              <a href="https://x.com/NavneethDG" target="_blank" rel="noopener noreferrer" className="px-4 py-1 text-xl flex flex-row items-center gap-2 text-[var(--background)] hover:text-[var(--link-hover)]">
                <FaXTwitter />
                <span className="hidden lg:inline">Twitter / X</span>
              </a>
            </nav>
          </div>
        </div>
      }
    >
      <section id="about" className="mb-4">
        <h1 id="about-subheading" className="relative text-2xl font-bold mb-4 after:content-[''] after:block after:h-[2px] after:w-12 after:bg-[var(--foreground)] after:mt-2">
          About Me !
        </h1>
        <div className="flex flex-col md:flex-row items-start gap-6 md:items-center">
          <img
            src="images/ETLogo.png"
            alt="Navneeth Dhamotharan"
            className="w-40 h-40 rounded-lg object-cover flex-shrink-0 mx-auto md:mx-0"
          />

          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-4">
              Hi! I'm Navneeth
            </h2>
            <p className="text-l mb-4">
              I'm currently a Bachelor's student at the University of Washington,
              specializing in Data Science under the iSchool, with a second degree in
              Economics. My primary interests lie in Software and Data Engineering,
              with a growing focus on the intersection of Machine Learning and
              economic applications.
            </p>
            <p className="text-l mb-4">
              Outside the classroom, I’m the director at Eat Together, a platform
              helping students connect over shared meals. I also contribute to the
              Software Engineering Career Club, building tools and community through SWECC Labs,
              Resume Review platform and other projects to support students in becoming better
              engineers.
            </p>
            <p className="text-l mb-4">
              I'm currently developing a stock market prediction platform that brings
              together software, data pipelines, and ML modeling—culminating in an
              interactive dashboard to visualize forecasts and trends.
            </p>
          </div>
        </div>
      </section>
      <section id="education" className="mb-4">
        <h1 id="education-subheading" className="relative text-2xl font-bold mb-4 after:content-[''] after:block after:h-[3px] after:w-16 after:bg-[var(--foreground)] after:mt-2">
          Education
        </h1>
        <h2 className="text-xl font-semibold mb-1">
          University of Washington, Seattle
        </h2>
        <div className="flex flex-wrap justify-between items-center text-lg text-[var(--sidebar)] mb-2">
          <span>B.S. Informatics: Data Science &nbsp; + &nbsp; B.A. Economics (GPA: 3.54)</span>
          <span className="text-lg italic text-[var(--sidebar)]">
            Sep 2023 – Jun 2027 (Expected)
          </span>
        </div>
        <p className="leading-relaxed">
          <span className="font-semibold">Relevant Coursework:</span> Data Structures and Algorithms, 
          Introduction to Data Science, Statistical Analysis in R, Databases, Econometrics, Object Oriented Programming,
          Intermediate Data Programming
        </p>
      </section>
      <section id="experience" className="mb-4">
        <h1 id="experience-subheading" className="relative text-2xl font-bold mb-4 after:content-[''] after:block after:h-[3px] after:w-16 after:bg-[var(--foreground)] after:mt-2">
          Experience
        </h1>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="w-full md:w-28 flex-shrink-0">
            <img
              src="images/flydubai.avif"
              alt="Company Logo"
              className="w-20 h-20 object-contain mx-auto md:mx-0 rounded-lg"
            />
          </div>

          <div className="flex-1">
            <div className="flex justify-between flex-wrap">
              <h3 className="text-lg font-semibold">Data Engineer Intern</h3>
              <span className="text-lg text-[var(--foreground)]">Jun. 2025 – Present</span>
            </div>

            <div className="flex justify-between flex-wrap">
              <span className="text-[var(--h3)]">FlyDubai</span>
              <span className="text-[var(--h3)]">Dubai, UAE</span>
            </div>

            <ul className="list-disc pl-5 mt-2 space-y-1 text-[var(--h4)]">
              <li>Developed models to predict flight delay accuracy for <b>600,000+ rows</b> and <b>90+ features</b> with an <b>80% R<sup>2</sup></b>.</li>
              <li>Built data and ML pipelines using AWS S3, Lambda, and Step Functions to perform ETL and schema design integrating data from 5+ sources make accurate predictions.</li>
              <li>Enhanced model prediction by <b>5%</b> by performing EDA on <b> 50+</b> numerical features</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="w-full md:w-28 flex-shrink-0">
            <img
              src="images/swecc.jpg"
              alt="Company Logo"
              className="w-20 h-20 object-contain mx-auto md:mx-0 rounded-lg"
            />
            <div className="mt-2 flex flex-row justify-center md:justify-start gap-1 text-lg">
              <a 
                className="flex items-center gap-1"
                href="https://github.com/navneethd8"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub/>
              </a>
              <a 
                className="flex items-center gap-1"
                href="https://github.com/navneethd8"
                target="_blank"
                rel="noopener noreferrer"
        
              >
                <CgWebsite/>
              </a>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex justify-between flex-wrap">
              <h3 className="text-lg font-semibold">Software Engineering Officer</h3>
              <span className="text-lg text-[var(--foreground)]">Apr. 2024 – Present</span>
            </div>

            <div className="flex justify-between flex-wrap">
              <span className="text-[var(--h3)]">Software Engineering Career Club</span>
              <span className="text-[var(--h3)]">Seattle, WA</span>
            </div>

            <ul className="list-disc pl-5 mt-2 space-y-1 text-[var(--h4)]">
              <li>Led SWECC Labs, mentoring <b>35+ students</b> to open-source development for career growth.</li>
              <li>Improved the job search process for <b>2000+</b> aspiring software engineers by developing and enhancing platforms across <b>38+</b> repositories.</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="w-full md:w-28 flex-shrink-0">
            <img
              src="images/ETLogo.png"
              alt="Company Logo"
              className="w-20 h-20 object-contain mx-auto md:mx-0 rounded-lg"
            />
            <div className="mt-2 flex flex-row justify-center md:justify-start gap-1 text-lg">
              <a 
                className="flex items-center gap-1"
                href="https://github.com/navneethd8"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub/>
              </a>
              <a 
                className="flex items-center gap-1"
                href="https://github.com/navneethd8"
                target="_blank"
                rel="noopener noreferrer"
        
              >
                <CgWebsite/>
              </a>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex justify-between flex-wrap">
              <h3 className="text-lg font-semibold">Development Lead</h3>
              <span className="text-lg text-[var(--foreground)]">Dec. 2024 – Present</span>
            </div>

            <div className="flex justify-between flex-wrap">
              <span className="text-[var(--h3)]">Eat Together</span>
              <span className="text-[var(--h3)]">Seattle, WA</span>
            </div>

            <ul className="list-disc pl-5 mt-2 space-y-1 text-[var(--h4)]">
              <li>Led a team of 6 developers for a student-led startup by enhancing engagement for 500+ users.</li>
              <li>Added 30 users by redeveloping the website, app availability selection, and developing a community Discord bot.</li>
              <li>Reduced code review time by 20% through hands-on workshops and feedback sessions, mentoring 20+ developers in React Native(Expo), Git, and Google Cloud Platform for a cross functional cohort of 35.</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="w-full md:w-28 flex-shrink-0">
            <img
              src="images/ETLogo.png"
              alt="Company Logo"
              className="w-20 h-20 object-contain mx-auto md:mx-0 rounded-lg"
            />
            <div className="mt-2 flex flex-row justify-center md:justify-start gap-1 text-lg">
              <a 
                className="flex items-center gap-1"
                href="https://github.com/navneethd8"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub/>
              </a>
              <a 
                className="flex items-center gap-1"
                href="https://github.com/navneethd8"
                target="_blank"
                rel="noopener noreferrer"
        
              >
                <CgWebsite/>
              </a>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex justify-between flex-wrap">
              <h3 className="text-lg font-semibold">Eat Together</h3>
              <span className="text-lg text-[var(--foreground)]">Jan. 2024 – Dec. 2024</span>
            </div>

            <div className="flex justify-between flex-wrap">
              <span className="text-[var(--h3)]">Eat Together</span>
              <span className="text-[var(--h3)]">Seattle, WA</span>
            </div>

            <ul className="list-disc pl-5 mt-2 space-y-1 text-[var(--h4)]">
              <li>Enhanced media management by developing a photo gallery using React Native and Expo Image Picker.</li>
              <li>Integrated Firebase for seamless image storage and retrieval, optimizing app performance and user interaction.</li>
              <li>Scaled the app to 400+ users by enhancing core functionality through batch processing and load reduction.</li>
              <li>Resolved 35+ UI bugs and 8+ critical issues, improving app stability and user experience.</li>

            </ul>
          </div>
        </div>


      </section>
      <section id="skills" className="mb-4">
        <h1 id="skills-subheading" className="relative text-2xl font-bold mb-4 after:content-[''] after:block after:h-[3px] after:w-16 after:bg-[var(--foreground)] after:mt-2">
          Skills
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-sm font-bold text-[var(--foreground)] uppercase mb-3">Languages</h3>
            <div className="flex flex-wrap gap-2">
              {["Java", "Python", "SQL(Postgres)", "JavaScript", "HTML", "CSS", "R", "React", "Node.js"].map((lang) => (
                <span
                  key={lang}
                  className="bg-[var(--link-hover)] dark:bg-[var(--link)] px-3 py-1 rounded-md text-sm font-mono"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-[var(--foreground)] uppercase mb-3"> Tools & Frameworks</h3>
            <div className="flex flex-wrap gap-2">
              {[ "Git", "Google Cloud Platform(GCP)", "Homebrew", "Firebase", "RStudio", "Docker", "bash", "AWS"].map((tool) => (
                <span
                  key={tool}
                  className="bg-[var(--link-hover)] dark:bg-[var(--link)] px-3 py-1 rounded-md text-sm font-mono"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
          <div className="md:col-span-full flex md:justify-center">
            <div>
              <h3 className="text-sm font-bold text-[var(--foreground)] uppercase mb-3 text-left md:text-center">
                Libraries
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 justify-items-start md:justify-items-center">
                {["Pandas", "NumPy", "Matplotlib", "Seaborn", "Geopandas", "TensorFlow", "SciKitLearn", "Tidyverse"].map((lib) => (
                  <span
                    key={lib}
                    className="bg-[var(--link-hover)] dark:bg-[var(--link)] px-3 py-1 rounded-md text-sm font-mono"
                  >
                    {lib}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="projects" className="mb-4">
        <h1 id="skills-subheading" className="relative text-2xl font-bold mb-4 after:content-[''] after:block after:h-[3px] after:w-16 after:bg-[var(--foreground)] after:mt-2">
          Projects
        </h1>
        
        <div className="project-card border-b border-gray-300 pb-4 mb-6">
          <div className="flex">
            <div className="flex-1 pr-4">
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-lg font-bold">SAT Decoded</h3>
                <div className="text-lg whitespace-nowrap">
                  Jan. 2024 – Present
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-2">
                <span className="bg-[var(--link-hover)] dark:bg-[var(--link)] px-2 py-1 rounded-md text-xs font-mono">React</span>
                <span className="bg-[var(--link-hover)] dark:bg-[var(--link)] px-2 py-1 rounded-md text-xs font-mono">Firebase</span>
                <span className="bg-[var(--link-hover)] dark:bg-[var(--link)] px-2 py-1 rounded-md text-xs font-mono">Tailwind</span>
                <span className="bg-[var(--link-hover)] dark:bg-[var(--link)] px-2 py-1 rounded-md text-xs font-mono">Plaid API</span>
              </div>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-[var(--h4)]">
                <li>Developed a budgeting and expense tracking feature integrated with Plaid API.</li>
                <li>Implemented authentication and real-time database updates using Firebase.</li>
                <li>Designed mobile-friendly UI using TailwindCSS with smooth animations.</li>
              </ul>
            </div>

            <div className="w-2/5 flex items-start justify-end">
              <img
                src="images/ETLogo.png"
                alt="Project Screenshot"
                className="w-full h-auto max-h-40 object-cover rounded-md"
              />
            </div>
          </div>
        </div>

        <div className="project-card border-b border-gray-300 pb-4 mb-6">
          <div className="flex">
            <div className="flex-1 pr-4">
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-lg font-bold">Discord Bot</h3>
                <div className="text-lg whitespace-nowrap">
                  Jan. 2024 – Present
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-2">
                <span className="bg-[var(--link-hover)] dark:bg-[var(--link)] px-2 py-1 rounded-md text-xs font-mono">React</span>
                <span className="bg-[var(--link-hover)] dark:bg-[var(--link)] px-2 py-1 rounded-md text-xs font-mono">Firebase</span>
                <span className="bg-[var(--link-hover)] dark:bg-[var(--link)] px-2 py-1 rounded-md text-xs font-mono">Tailwind</span>
                <span className="bg-[var(--link-hover)] dark:bg-[var(--link)] px-2 py-1 rounded-md text-xs font-mono">Plaid API</span>
              </div>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-[var(--h4)]">
                <li>Developed a budgeting and expense tracking feature integrated with Plaid API.</li>
                <li>Implemented authentication and real-time database updates using Firebase.</li>
                <li>Designed mobile-friendly UI using TailwindCSS with smooth animations.</li>
              </ul>
            </div>

            <div className="w-2/5 flex items-start justify-end">
              <img
                src="images/ETLogo.png"
                alt="Project Screenshot"
                className="w-full h-auto max-h-40 object-cover rounded-md"
              />
            </div>
          </div>
        </div>
        <div className="project-card border-b border-gray-300 pb-4 mb-6">
          <div className="flex">
            <div className="flex-1 pr-4">
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-lg font-bold">Bingo on the Ave</h3>
                <div className="text-lg whitespace-nowrap">
                  Jan. 2024 – Present
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-2">
                <span className="bg-[var(--link-hover)] dark:bg-[var(--link)] px-2 py-1 rounded-md text-xs font-mono">React</span>
                <span className="bg-[var(--link-hover)] dark:bg-[var(--link)] px-2 py-1 rounded-md text-xs font-mono">Firebase</span>
                <span className="bg-[var(--link-hover)] dark:bg-[var(--link)] px-2 py-1 rounded-md text-xs font-mono">Tailwind</span>
                <span className="bg-[var(--link-hover)] dark:bg-[var(--link)] px-2 py-1 rounded-md text-xs font-mono">Plaid API</span>
              </div>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-[var(--h4)]">
                <li>Developed a budgeting and expense tracking feature integrated with Plaid API.</li>
                <li>Implemented authentication and real-time database updates using Firebase.</li>
                <li>Designed mobile-friendly UI using TailwindCSS with smooth animations.</li>
              </ul>
            </div>

            <div className="w-2/5 flex items-start justify-end">
              <img
                src="images/ETLogo.png"
                alt="Project Screenshot"
                className="w-full h-auto max-h-40 object-cover rounded-md"
              />
            </div>
          </div>
        </div>
        <div className="project-card border-b border-gray-300 pb-4 mb-6">
          <div className="flex">
            <div className="flex-1 pr-4">
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-lg font-bold">Mentura</h3>
                <div className="text-lg whitespace-nowrap">
                  Jan. 2024 – Present
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-2">
                <span className="bg-[var(--link-hover)] dark:bg-[var(--link)] px-2 py-1 rounded-md text-xs font-mono">React</span>
                <span className="bg-[var(--link-hover)] dark:bg-[var(--link)] px-2 py-1 rounded-md text-xs font-mono">Firebase</span>
                <span className="bg-[var(--link-hover)] dark:bg-[var(--link)] px-2 py-1 rounded-md text-xs font-mono">Tailwind</span>
                <span className="bg-[var(--link-hover)] dark:bg-[var(--link)] px-2 py-1 rounded-md text-xs font-mono">Plaid API</span>
              </div>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-[var(--h4)]">
                <li>Developed a budgeting and expense tracking feature integrated with Plaid API.</li>
                <li>Implemented authentication and real-time database updates using Firebase.</li>
                <li>Designed mobile-friendly UI using TailwindCSS with smooth animations.</li>
              </ul>
            </div>

            <div className="w-2/5 flex items-start justify-end">
              <img
                src="images/ETLogo.png"
                alt="Project Screenshot"
                className="w-full h-auto max-h-40 object-cover rounded-md"
              />
            </div>
          </div>
        </div>

        <div className="project-card border-b border-gray-300 pb-4 mb-6">
          <div className="flex">
            <div className="flex-1 pr-4">
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-lg font-bold">Fundit</h3>
                <div className="text-lg whitespace-nowrap">
                  Jan. 2024 – Present
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-2">
                <span className="bg-[var(--link-hover)] dark:bg-[var(--link)] px-2 py-1 rounded-md text-xs font-mono">React</span>
                <span className="bg-[var(--link-hover)] dark:bg-[var(--link)] px-2 py-1 rounded-md text-xs font-mono">Firebase</span>
                <span className="bg-[var(--link-hover)] dark:bg-[var(--link)] px-2 py-1 rounded-md text-xs font-mono">Tailwind</span>
                <span className="bg-[var(--link-hover)] dark:bg-[var(--link)] px-2 py-1 rounded-md text-xs font-mono">Plaid API</span>
              </div>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-[var(--h4)]">
                <li>Developed a budgeting and expense tracking feature integrated with Plaid API.</li>
                <li>Implemented authentication and real-time database updates using Firebase.</li>
                <li>Designed mobile-friendly UI using TailwindCSS with smooth animations.</li>
              </ul>
            </div>

            <div className="w-2/5 flex items-start justify-end">
              <img
                src="images/ETLogo.png"
                alt="Project Screenshot"
                className="w-full h-auto max-h-40 object-cover rounded-md"
              />
            </div>
          </div>
        </div>



        <div className="project-card border-b border-gray-300 pb-4 mb-6">
          <div className="flex justify-between items-center mb-1">
            <h3 className="text-lg font-bold">Stock Market Analysis</h3>
            <div className="text-lg">Ongoing</div>
          </div>

          <div className="flex flex-wrap gap-2 mb-2">
            <span className="bg-[var(--link-hover)] dark:bg-[var(--link)] px-2 py-1 rounded-md text-xs font-mono">Python</span>
            <span className="bg-[var(--link-hover)] dark:bg-[var(--link)] px-2 py-1 rounded-md text-xs font-mono">XGBoost</span>
            <span className="bg-[var(--link-hover)] dark:bg-[var(--link)] px-2 py-1 rounded-md text-xs font-mono">Scikit-learn</span>
            <span className="bg-[var(--link-hover)] dark:bg-[var(--link)] px-2 py-1 rounded-md text-xs font-mono">Pandas</span>
            <span className="bg-[var(--link-hover)] dark:bg-[var(--link)] px-2 py-1 rounded-md text-xs font-mono">Tableau</span>

          </div>

          <ul className="list-disc pl-5 mt-2 space-y-1 text-[var(--h4)]">
            <li>Developing a predictive model using the last 10 years of SPY data for efficiency.</li>
            <li>Extending the model for real-time predictions via a BI dashboard and live data stream.</li>
          </ul>
        </div>


        <div className="project-card border-b border-gray-300 pb-4 mb-6">
          <div className="flex justify-between items-center mb-1">
            <h3 className="text-lg font-bold">MacroScope</h3>
            <div className="text-lg">May 2025. - Jun. 2025</div>
          </div>

          <div className="flex flex-wrap gap-2 mb-2">
            <span className="bg-[var(--link-hover)] dark:bg-[var(--link)] px-2 py-1 rounded-md text-xs font-mono">Python</span>
            <span className="bg-[var(--link-hover)] dark:bg-[var(--link)] px-2 py-1 rounded-md text-xs font-mono">Geopandas</span>
            <span className="bg-[var(--link-hover)] dark:bg-[var(--link)] px-2 py-1 rounded-md text-xs font-mono">Folium</span>
            <span className="bg-[var(--link-hover)] dark:bg-[var(--link)] px-2 py-1 rounded-md text-xs font-mono">XGBoost</span>
            <span className="bg-[var(--link-hover)] dark:bg-[var(--link)] px-2 py-1 rounded-md text-xs font-mono">Scikit-learn</span>
            <span className="bg-[var(--link-hover)] dark:bg-[var(--link)] px-2 py-1 rounded-md text-xs font-mono">Pandas</span>
            <span className="bg-[var(--link-hover)] dark:bg-[var(--link)] px-2 py-1 rounded-md text-xs font-mono">Seaborn</span>
            <span className="bg-[var(--link-hover)] dark:bg-[var(--link)] px-2 py-1 rounded-md text-xs font-mono">Matplotlib</span>
          </div>

          <ul className="list-disc pl-5 mt-2 space-y-1 text-[var(--h4)]">
            <li>Processed 400K+ IMF records with Pandas/GeoPandas, integrating fiscal and balance-of-payments data, and built an interactive global economic map using Folium.</li>
            <li>Generated 6 trend charts with Seaborn/Matplotlib to visualize macroeconomic indicators and support inflation prediction insights.</li>
            <li>Improved prediction accuracy by 20%, reducing RMSE from 2.899 to 2.309 and maintaining MAE under 1.21 through Random Forest optimization, hyperparameter tuning, and data validation.</li>
          </ul>
        </div>



        <div className="project-card border-b border-gray-300 pb-4 mb-6">
          <div className="flex justify-between items-center mb-1">
            <h3 className="text-lg font-bold">DataMed</h3>
            <div className="text-lg">Apr. 2025</div>
          </div>

          <div className="flex flex-wrap gap-2 mb-2">
            <span className="bg-[var(--link-hover)] dark:bg-[var(--link)] px-2 py-1 rounded-md text-xs font-mono">Python</span>
            <span className="bg-[var(--link-hover)] dark:bg-[var(--link)] px-2 py-1 rounded-md text-xs font-mono">Scikit-learn</span>
            <span className="bg-[var(--link-hover)] dark:bg-[var(--link)] px-2 py-1 rounded-md text-xs font-mono">Optuna</span>
            <span className="bg-[var(--link-hover)] dark:bg-[var(--link)] px-2 py-1 rounded-md text-xs font-mono">Pandas</span>
            <span className="bg-[var(--link-hover)] dark:bg-[var(--link)] px-2 py-1 rounded-md text-xs font-mono">Numpy</span>
            <span className="bg-[var(--link-hover)] dark:bg-[var(--link)] px-2 py-1 rounded-md text-xs font-mono">Seaborn</span>
            <span className="bg-[var(--link-hover)] dark:bg-[var(--link)] px-2 py-1 rounded-md text-xs font-mono">Matplotlib</span>
          </div>

          <ul className="list-disc pl-5 mt-2 space-y-1 text-[var(--h4)]">
            <li>Awarded <b>3rd</b> place for <b>Best Machine Learning Model</b> in the 6th DubsTech Datathon.</li>
            <li>Predicted avgerage costs for <b>1.2M healthcare records</b> using Pandas and Scikit-learn, achieving 99% data retention.</li>
            <li>Engineered features with Scikit-learn’s LabelEncoder, transforming 4 categorical variables for model readiness.</li>
            <li>Tuned hyperparameters for predictive modeling using Scikit-learn and Optuna, improving prediction accuracy.</li>
          </ul>
        </div>

        <div className="project-card border-b border-gray-300 pb-4 mb-6">
          <div className="flex justify-between items-center mb-1">
            <h3 className="text-lg font-bold">March Madness vs. Regular Season</h3>
            <div className="text-lg">Jan 2025. - Mar. 2025</div>
          </div>

          <div className="flex flex-wrap gap-2 mb-2">
            <span className="bg-[var(--link-hover)] dark:bg-[var(--link)] px-2 py-1 rounded-md text-xs font-mono">R</span>
            <span className="bg-[var(--link-hover)] dark:bg-[var(--link)] px-2 py-1 rounded-md text-xs font-mono">R Studio</span>
            <span className="bg-[var(--link-hover)] dark:bg-[var(--link)] px-2 py-1 rounded-md text-xs font-mono">tidyverse</span>
            <span className="bg-[var(--link-hover)] dark:bg-[var(--link)] px-2 py-1 rounded-md text-xs font-mono">ggplot2</span>
            <span className="bg-[var(--link-hover)] dark:bg-[var(--link)] px-2 py-1 rounded-md text-xs font-mono">dplyr</span>
          </div>

          <ul className="list-disc pl-5 mt-2 space-y-1 text-[var(--h4)]">
            <li>Analyzed 20 years of men's college basketball free throws across 300K+ rows from three datasets.</li>
            <li>Calculated 0.25 correlation between regular season free throws and NCAA tournament wins.</li>
            <li>Merged datasets, created 10+ analysis columns, cleaned missing values, and visualized success rates.</li>
          </ul>
        </div>

      </section>
      <section id="resume" className="mb-4">
        <h1 id="skills-subheading" className="relative text-2xl font-bold mb-6 after:content-[''] after:block after:h-[3px] after:w-16 after:bg-[var(--foreground)] after:mt-2">
          Resume
        </h1>
        <h2 className="text-xl font-semibold mb-6 text-center">
          Download my resume below!
        </h2>
        <div className="flex justify-center">
          <a
            href="Resume_Navneeth.pdf"
            target="_blank"
            className="resume-link px-6 py-2 rounded-md text-lg font-mono text-center"
          >
            Resume
          </a>
        </div>
      </section>
    </SiteLayout>
  );
}
