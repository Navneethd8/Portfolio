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
              <a href="#projects-data" className="px-4 py-1 text-xl text-[var(--link)] hover:text-[var(--link-hover)]">
                Data Projects
              </a>
              <a href="#projects-swe" className="px-4 py-1 text-xl text-[var(--link)] hover:text-[var(--link-hover)]">
                SWE Projects
              </a>

              <a href="#resume" className="px-4 py-1 text-xl text-[var(--link)] hover:text-[var(--link-hover)]">
                Resume
              </a>
            </nav>

            <div>
              <p className="text-[var(--background)] text-xl">Get In Touch</p>
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
            src="images/navneeth.jpeg"
            alt="Navneeth Dhamotharan"
            className="w-40 h-40 rounded-lg object-cover flex-shrink-0 mx-auto md:mx-0"
          />

          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-4">
              Hi! I&apos;m Navneeth
            </h2>
            <p className="text-l mb-4">
              I&apos;m currently a Bachelor&apos;s student at the University of Washington,
              specializing in Data Science under the iSchool, with a second degree in
              Economics. My primary interests lie in Software and Data Engineering,
              with a growing focus on the intersection of Machine Learning and
              economic applications.
            </p>
            <p className="text-l mb-4">
              Outside the classroom, I&apos;m the incoming director at <a href="https://eat-together.org/">Eat Together</a>, a platform
              helping students connect over shared meals. I also contribute to the
              Software Engineering Career Club, building tools and community through an in house
              Resume Review platform, <a href="https://labs.swecc.org/" className="text-[var(--link)]">SWECC Labs</a> and other projects to support students in becoming better
              engineers.
            </p>
            <p className="text-l mb-4">
              I&apos;m currently developing a stock market prediction platform that brings
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
              src="images/ETLogo.png"
              alt="Company Logo"
              className="w-20 h-20 object-contain mx-auto md:mx-0 rounded-lg"
            />
            <div className="mt-2 flex flex-row justify-center md:justify-start gap-1 text-lg">
              <a 
                className="flex items-center gap-1"
                href="https://www.eat-together.org/"
                target="_blank"
                rel="noopener noreferrer"
        
              >
                <CgWebsite/>
              </a>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex justify-between flex-wrap">
              <h3 className="text-lg font-semibold">Director</h3>
              <span className="text-lg text-[var(--foreground)]">Sep. 2025 – Present</span>
            </div>

            <div className="flex justify-between flex-wrap">
              <span className="text-[var(--h3)]">Eat Together</span>
              <span className="text-[var(--h3)]">Seattle, WA</span>
            </div>

            <ul className="list-disc pl-5 mt-2 space-y-1 text-[var(--h4)]">
              <li>Connected over <b>550</b> students through shared meals @The University of Washington.</li>
            </ul>
          </div>
        </div>

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
              <h3 className="text-lg font-semibold">Data Science Intern</h3>
              <span className="text-lg text-[var(--foreground)]">Jun. 2025 – Sep. 2025</span>
            </div>

            <div className="flex justify-between flex-wrap">
              <span className="text-[var(--h3)]">FlyDubai</span>
              <span className="text-[var(--h3)]">Dubai, UAE</span>
            </div>

            <ul className="list-disc pl-5 mt-2 space-y-1 text-[var(--h4)]">
              <li>Developed models to predict flight delay accuracy for <b>600,000+ rows</b> and <b>90+ features</b> with an <b>80% R<sup>2</sup></b>.</li>
              <li>Enhanced model prediction by <b>8%</b> by performing EDA on <b> 50+</b> numerical features.</li>
              <li>Performed Experiments on <b>3 weather APIs</b> to find the data optimal for the model.</li>
              <li>Optimized operational efficiency by 3% through a PuLP-based linear programming optimizer in Python.</li>
              <li>Achieved 30% improvement in sentiment analysis accuracy by testing 3 prompting techniques on Amazon Bedrock.</li>
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
                href="https://github.com/swecc-uw"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub/>
              </a>
              <a 
                className="flex items-center gap-1"
                href="https://swecc.org/"
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
              <span className="text-lg text-[var(--foreground)]">Apr. 2025 – Present</span>
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
                href="https://www.eat-together.org/"
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
              <span className="text-lg text-[var(--foreground)]">Dec. 2024 – Sep. 2025</span>
            </div>

            <div className="flex justify-between flex-wrap">
              <span className="text-[var(--h3)]">Eat Together</span>
              <span className="text-[var(--h3)]">Seattle, WA</span>
            </div>

            <ul className="list-disc pl-5 mt-2 space-y-1 text-[var(--h4)]">
              <li>Led a team of <b>6 developers</b> for a student-led startup by enhancing engagement for <b>500+ users</b>.</li>
              <li>Added <b>30 users</b> by redeveloping the website, app availability selection, and developing a community Discord bot.</li>
              <li>Reduced code review time by <b>20%</b> through hands-on workshops and feedback sessions, mentoring <b>20+</b> developers in <b>React Native(Expo), Git, and Google Cloud Platform</b> for a cross functional developmental cohort of <b>35</b>.</li>
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
                href="https://www.eat-together.org/"
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
              <li>Enhanced media management by developing a photo gallery using <b>React Native and Expo Image Picker</b>.</li>
              <li><b>Integrated Firebase</b> for seamless image storage and retrieval, optimizing app performance and user interaction.</li>
              <li>Scaled the app to <b>400+</b> users by enhancing core functionality through batch processing and load reduction.</li>
              <li>Resolved <b>35+ bugs</b> and <b>8+ critical issues</b>, improving app stability and user experience.</li>

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
      <section id="projects-data" className="mb-4">
        <h1 id="sprojects-subheading" className="relative text-2xl font-bold mb-4 after:content-[''] after:block after:h-[3px] after:w-16 after:bg-[var(--foreground)] after:mt-2">
          Data Projects
        </h1>
        
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
            <li>Developing a predictive model using the last <b>10 years</b> of SPY data for efficiency.</li>
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
            <li>Processed <b>400K+</b> IMF records with Pandas/GeoPandas, integrating fiscal and balance-of-payments data, and built an interactive global economic map using Folium.</li>
            <li>Generated <b>6</b> trend charts with Seaborn/Matplotlib to visualize macroeconomic indicators and support inflation prediction insights.</li>
            <li>Improved prediction accuracy by <b>20%</b>, reducing <b>RMSE from 2.899</b> to <b>2.309</b> and maintaining <b>MAE under 1.21</b> through Random Forest optimization, hyperparameter tuning, and data validation.</li>
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
            <li>Predicted avgerage costs for <b>1.2M healthcare records</b> using Pandas and Scikit-learn, with <b>99% data retention</b>.</li>
            <li>Engineered features with Scikit-learn&apos;s LabelEncoder, transforming <b>4 categorical variables</b> for model readiness.</li>
            <li> Improved model accuracy by <b>3%</b> for predictive modelling by tuning hyperparameters using Optuna.</li>
          </ul>
        </div>

        <div className="project-card pb-4 mb-6">
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
            <li>Analyzed <b>20 years</b> of men&apos;s college basketball free throws across <b>300K+ rows</b> from three datasets.</li>
            <li>Calculated <b>0.25</b> correlation between regular season free throws and NCAA tournament wins.</li>
            <li>Merged datasets, created <b>10+</b> analysis columns, cleaned missing values, and visualized success rates.</li>
          </ul>
        </div>

      </section>
      <section id="projects-swe">
        <h1 id="resume-subheading" className="relative text-2xl font-bold mb-6 after:content-[''] after:block after:h-[3px] after:w-16 after:bg-[var(--foreground)] after:mt-2">
          Software Engineering Projects
        </h1>

        <div className="project-card border-b border-gray-300 pb-4 mb-6">
          <div className="flex flex-col-reverse md:flex-row-reverse items-start gap-4">
            <div className="flex-1 md:pr-4">
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-lg font-bold">Bingo on the Ave</h3>
                <div className="text-lg whitespace-nowrap">
                  Apr. 2025
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-2">
                <span className="bg-[var(--link-hover)] dark:bg-[var(--link)] px-2 py-1 rounded-md text-xs font-mono">React</span>
                <span className="bg-[var(--link-hover)] dark:bg-[var(--link)] px-2 py-1 rounded-md text-xs font-mono">Next</span>
                <span className="bg-[var(--link-hover)] dark:bg-[var(--link)] px-2 py-1 rounded-md text-xs font-mono">TypeScript</span>
                <span className="bg-[var(--link-hover)] dark:bg-[var(--link)] px-2 py-1 rounded-md text-xs font-mono">Google Places API</span>
              </div>

              <ul className="list-disc pl-5 mt-2 space-y-1 text-[var(--h4)]">
                <li>Developed Bingo on the Ave, a full-stack checklist site for students visiting essential UW locations, targeting <b>40,000+ students.</b></li>
                <li>Integrated geolocation and Google Search APIs with anti-cheating checks to track visits to <b>9</b> essential locations.</li>
                <li>Delivered fully functional, interactive prototype during April 2025 SWECCAthon, receiving <b>3rd place</b> and positive feedback from <b>5 judges</b>.</li>
              </ul>
            </div>

            <div className="w-full md:w-[25%] flex flex-col items-center md:items-start mb-4 md:mb-0">
              <img
                src="images/AveBingo.png"
                alt="Project Screenshot"
                className="w-full h-auto max-h-40 object-cover rounded-md"
              />
              <div className="flex items-center gap-1 mt-2">
                <a
                  href="https://avebingo.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <CgWebsite className="text-2xl" />
                </a>
                <a
                  href="https://github.com/Navneethd8/sweccathon25"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub className="text-2xl" />
                </a>

              </div>
            </div>
          </div>
        </div>


        <div className="project-card border-b border-gray-300 pb-4 mb-6">
          <div className="flex flex-col-reverse md:flex-row items-start gap-4">
            <div className="flex-1 md:pl-4">
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-lg font-bold">Fundit</h3>
                <div className="text-lg whitespace-nowrap">
                  Oct. 2024 – Jun. 2025
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-2">
                <span className="bg-[var(--link-hover)] dark:bg-[var(--link)] px-2 py-1 rounded-md text-xs font-mono">React Native</span>
                <span className="bg-[var(--link-hover)] dark:bg-[var(--link)] px-2 py-1 rounded-md text-xs font-mono">Expo</span>
                <span className="bg-[var(--link-hover)] dark:bg-[var(--link)] px-2 py-1 rounded-md text-xs font-mono">Firebase</span>
                <span className="bg-[var(--link-hover)] dark:bg-[var(--link)] px-2 py-1 rounded-md text-xs font-mono">TypeScript</span>
                <span className="bg-[var(--link-hover)] dark:bg-[var(--link)] px-2 py-1 rounded-md text-xs font-mono">Plaid API</span>
                <span className="bg-[var(--link-hover)] dark:bg-[var(--link)] px-2 py-1 rounded-md text-xs font-mono">Polygon API</span>
              </div>

              <ul className="list-disc pl-5 mt-2 space-y-1 text-[var(--h4)]">
                <li>Engineered a comprehensive stock overview feature using <b>Polygon API and React Native</b>, designed to boost user engagement with portfolio management by an estimated <b>15%</b> and enhance personalized financial tracking.</li>
                <li>Designed and maintained a robust and scalable <b>Firebase</b> backend using Firestore and Storage, ensuring seamless real-time data flow for transactions and stock portfolios, achieving instant updates.</li>
                <li>Integrated <b>Plaid API</b> with React Native (Expo) to deliver a smooth, cross-platform mobile experience with secure financial data synchronization, targeting over <b>95%</b> successful bank account linkages and a seamless experience.</li>
              </ul>
            </div>

            <div className="w-full md:w-[25%] flex flex-col items-center md:items-start mb-4 md:mb-0">
              <img
                src="images/FundIt.png"
                alt="Project Screenshot"
                className="w-full h-auto max-h-40 object-cover rounded-md"
              />
              <a
                className="flex items-center gap-1 mt-2"
                href="https://github.com/hcp-uw/fundit"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub className="text-2xl" />
              </a>
            </div>
          </div>
        </div>

        <div className="project-card border-b border-gray-300 pb-4 mb-6">
          <div className="flex flex-col-reverse md:flex-row-reverse items-start gap-4">
            <div className="flex-1 md:pr-4">
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-lg font-bold">Mentura</h3>
                <div className="text-lg whitespace-nowrap">
                  Oct. 2024
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-2">
                <span className="bg-[var(--link-hover)] dark:bg-[var(--link)] px-2 py-1 rounded-md text-xs font-mono">React</span>
                <span className="bg-[var(--link-hover)] dark:bg-[var(--link)] px-2 py-1 rounded-md text-xs font-mono">Next</span>
                <span className="bg-[var(--link-hover)] dark:bg-[var(--link)] px-2 py-1 rounded-md text-xs font-mono">AWS Amplify</span>
                <span className="bg-[var(--link-hover)] dark:bg-[var(--link)] px-2 py-1 rounded-md text-xs font-mono">Perplexity API</span>
                <span className="bg-[var(--link-hover)] dark:bg-[var(--link)] px-2 py-1 rounded-md text-xs font-mono">YouTube API</span>
              </div>

              <ul className="list-disc pl-5 mt-2 space-y-1 text-[var(--h4)]">
                <li>Developed Mentura, a full-stack<b> AWS Amplify</b> platform potentially serving <b>3,000+</b> UW STEM freshmen.</li>
                <li>Integrated <b>YouTube API</b> to deliver <b>15</b> curated videos per concept, improving study material accessibility.</li>
                <li>Built AI-powered concept overviews via <b>Perplexity API</b> and delivered scalable prototype in <b>48 hours</b> at DubHacks.</li>
              </ul>
            </div>

            <div className="w-full md:w-[25%] flex flex-col items-center md:items-start mb-4 md:mb-0">
              <img
                src="images/Mentura.png"
                alt="Project Screenshot"
                className="w-full h-auto max-h-40 object-cover rounded-md"
              />
              <div className="flex items-center gap-1 mt-2">
                <a
                  href="https://main.dhulrjtlxnvx6.amplifyapp.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <CgWebsite className="text-2xl" />
                </a>
                <a
                  href="https://github.com/study-app-dh24/study-app"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub className="text-2xl" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="project-card border-b border-gray-300 pb-4 mb-6">
          <div className="flex flex-col-reverse md:flex-row items-start gap-4">
            <div className="flex-1 md:pl-4">
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-lg font-bold">SAT Decoded</h3>
                <div className="text-lg whitespace-nowrap">
                  Jun. 2023 – Sep. 2024
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="bg-[var(--link-hover)] dark:bg-[var(--link)] px-2 py-1 rounded-md text-xs font-mono">HTML</span>
                <span className="bg-[var(--link-hover)] dark:bg-[var(--link)] px-2 py-1 rounded-md text-xs font-mono">CSS</span>
                <span className="bg-[var(--link-hover)] dark:bg-[var(--link)] px-2 py-1 rounded-md text-xs font-mono">SailsJS</span>
                <span className="bg-[var(--link-hover)] dark:bg-[var(--link)] px-2 py-1 rounded-md text-xs font-mono">PostgreSQL</span>
                <span className="bg-[var(--link-hover)] dark:bg-[var(--link)] px-2 py-1 rounded-md text-xs font-mono">Sendgrid API</span>
              </div>

              <ul className="list-disc pl-5 mt-2 space-y-1 text-[var(--h4)]">
                <li>Created an open-source website targeting <b>800+</b> students preparing for the SAT for my IB Diploma.</li>
                <li>Improved accessibility to SAT resources through interactive quizzes and resource uploads.</li>
                <li>Built using <b>HTML, CSS, PostgreSQL, and JavaScript</b> with <b>SailsJS, SendGrid API</b> for email reporting.</li>
              </ul>
            </div>

            <div className="w-full md:w-[25%] flex flex-col items-center md:items-start mb-4 md:mb-0">
              <img
                src="images/SATDecoded.png"
                alt="Project Screenshot"
                className="w-full h-auto max-h-40 object-cover rounded-md"
              />
              <a
                className="flex items-center gap-1 mt-2"
                href="https://github.com/Navneethd8/SATDecoded"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub className="text-2xl" />
              </a>

            </div>
          </div>
        </div>


      </section>
      <section id="resume" className="mb-4">
        <h1 id="resume-subheading" className="relative text-2xl font-bold mb-6 after:content-[''] after:block after:h-[3px] after:w-16 after:bg-[var(--foreground)] after:mt-2">
          Resume
        </h1>
        <h2 className="text-xl font-semibold mb-6 text-center">
          Download my resume below!
        </h2>
        <div className="flex justify-center gap-5">
          <a
            href="Navneeth_Dhamotharan_Resume.pdf"
            target="_blank"
            className="resume-link px-6 py-2 rounded-md text-lg font-mono text-center"
          >
            Software Engineering Resume
          </a>
          <a
            href="Dhamotharan_Navneeth_Resume.pdf"
            target="_blank"
            className=" resume-link px-6 py-2 rounded-md text-lg font-mono text-center"
          >
            Data Science Resume
          </a>
        </div>
      </section>
    </SiteLayout>
  );
}
