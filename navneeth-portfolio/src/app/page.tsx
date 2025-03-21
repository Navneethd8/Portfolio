import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">  
      <header>
        <div className="pt-[200]">
          <h1 className="text-center font-semibold" style={{fontSize:'80px'}}>
            Turning data into insights,
          </h1>
          <h1 className="indent-18" style={{fontSize:'80px'}}>
              and code into solutions.
          </h1>
        </div>
      </header>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="items-center justify-center pt-[200]">
          <h2 className = "text-left" style={{fontSize:'40px'}}>{
          "Hey! I'm Navneeth Dhamotharan, An aspiring Data Scientist @ The University of Washington pursuing a double degree in Informatics: Data Science and Economics."
          }</h2>
          <hr className="my-12 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />
          <h1 id="Projects"className="text-center justify-center font-semibold pt-[15] pb-[15]" style={{fontSize:'50px'}}>
            Projects
          </h1>

        </div>
        <div className="bg-gray-100 rounded-2xl p-6 shadow-md w-[1000px] h-[550px] mx-auto">
          <h2 className="text-xl font-semibold text-gray-700 text-center mb-4" style={{ fontSize: '40px' }}>
            Stock Prediction Model
          </h2>
          <div className="flex flex-row items-start space-x-5">
            <div className="w-[500px] h-[430px] bg-white rounded-xl shadow-md">
              <div style={{color:'black',fontSize:18}} className='p-[10px]'>
                <h1 style={{color:'grey',fontSize:18}}> Languages & Libraries: Python, SciKitLearn, numpy,pandas </h1>
                <p className='pt-[10px]'>
                  Developed a trend classification model in Python to predict the daily movement of the 
                  S&P 500 stock using K-Nearest Neighbors (KNN) and Random Forest. Utilized NumPy and 
                  Pandas for data preprocessing, handling historical stock price data and key financial 
                  indicators. Implemented KNN for pattern recognition by analyzing similar past market 
                  conditions and Random Forest for robust decision-making. Tuned hyperparameters and 
                  optimized feature selection to improve predictive accuracy, achieving over 75% 
                  accuracy on a validation dataset while mitigating overfitting.
                </p>
              </div>

            </div>
            <div className="flex flex-col pl-[50px] space-y-14">
            <div className="w-[400px] h-[200px] rounded-lg">
              <img 
                src="/images/SPYData.png" 
                alt="SPY" 
                style={{objectFit: 'scale-down', width: '100%', height: '100%'}}
              />
            </div>
              <div className="flex justify-center items-center h-full"> 
                <button className="bg-teal-700 text-white px-4 py-2 rounded-full shadow hover:bg-teal-800 transition">
                  <Link href="https://github.com/Navneethd8/spy-trend-model">
                    View Code
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 rounded-2xl p-6 shadow-md w-[1000px] h-[550px] mx-auto">
          <h2 className="text-xl font-semibold text-gray-700 text-center mb-4" style={{ fontSize: '40px' }}>
            FundIt
          </h2>
          <div className="flex flex-row items-start space-x-5">
            <div className="w-[500px] h-[430px] bg-white rounded-xl shadow-md">
              <div style={{color:'black',fontSize:18}} className='p-[10px]'>
                <h1 style={{color:'grey',fontSize:18}}> Languages: ReactJS (JavaScript), PlaidAPI, Google Cloud Platforms (Firebase Firestore) </h1>
                <p className='pt-[10px]'>
                  FundIt is a mobile app designed to help users optimize spending, 
                  reduce debt, and make informed investment decisions through an intuitive 
                  budgeting and investment platform. The app features a comprehensive budgeting 
                  tool, a net worth calculator, and a personalized user profile, enabling users 
                  to track their financial health effectively. Built on Firebase, FundIt ensures 
                  real-time transaction and portfolio updates, while Plaid API integration provides 
                  secure financial data synchronization. Developed using React Native (Expo), the 
                  app delivers a seamless, cross-platform experience.

                </p>
              </div>
            </div>
            <div className="flex flex-col pl-[50px] space-y-14">
            <div className="w-[400px] h-[200px] rounded-lg">
              <img 
                src="/images/FundIt.png" 
                alt="FundIt" 
                style={{objectFit: 'scale-down', width: '100%', height: '100%'}}
              />
            </div>
              <div className="flex justify-center items-center h-full"> 
                <button className="bg-teal-700 text-white px-4 py-2 rounded-full shadow hover:bg-teal-800 transition">
                  <Link href="https://github.com/hcp-uw/fundit/">
                    View Code
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>


        <div className="bg-gray-100 rounded-2xl p-6 shadow-md w-[1000px] h-[550px] mx-auto">
          <h2 className="text-xl font-semibold text-gray-700 text-center mb-4" style={{ fontSize: '40px' }}>
              SATDecoded
          </h2>
          <div className="flex flex-row items-start space-x-5">
            <div className="w-[500px] h-[430px] bg-white rounded-xl shadow-md">
              <div style={{color:'black',fontSize:18,}} className='p-[10px]'>
                <h1 style={{color:'grey',fontSize:18}}> Languages: HTML, CSS, SailsJS(JavaScript), PostgreSQL </h1>
                <p className='pt-[10px]'>
                  Developed a fully functional open-source website for high school students preparing 
                  for the SAT as part of my IB Computer Science Internal Assessment. Features include 
                  interactive quizzes, study notes, document uploads, and a mailing system to improve 
                  accessibility to SAT prep resources. Built using HTML, CSS, JavaScript, and SQL, 
                  leveraging SailsJS for the backend, PostgreSQL for database management, and SendGrid 
                  API for email integration. Designed with a user-friendly interface to enhance engagement 
                  and ease of use.
                </p>
              </div>
            </div>
            <div className="flex flex-col pl-[50px] space-y-14">
              <div className="w-[400px] h-[200px] bg-gray-300 rounded-lg"></div>
              <div className="flex justify-center items-center h-full"> 
                <button className="bg-teal-700 text-white px-4 py-2 rounded-full shadow hover:bg-teal-800 transition">
                  <Link href="https://github.com/Navneethd8/SATDecoded">
                    View Code
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4">
          <hr className="w-full my-12 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />
          <h1 id="work_Experience" className="text-center font-semibold pt-[15] pb-[15]" style={{fontSize:'50px'}}>
            Work Experience
          </h1>
        </div>
        <div className="bg-gray-100 rounded-2xl p-6 shadow-md w-[1000px] h-[550px] mx-auto">
          <h2 className="text-xl font-semibold text-gray-700 text-center mb-4" style={{ fontSize: '40px' }}>
              Eat Together
          </h2>
          <div className="flex flex-row items-start space-x-5">
            <div className="w-[500px] h-[430px] bg-white rounded-xl shadow-md">
              <div style={{color:'black',fontSize:18,}} className='p-[10px]'>
                <h1 style={{color:'grey',fontSize:18}}> Languages: React Native (JavaScript), Google Cloud Platforms(Firebase Firestore and Google Cloud Functions), Python </h1>
                <p className='pt-[10px]'>
                  {"As a Software Engineer and Development Lead at Eat Together, where I’ve grown through multiple roles, from Project Manager to Core Team Developer, I optimize user experience for nearly 500 users while mentoring 15+ developers in React Native, Firebase, and Git. My work includes refactoring the recommendation system to boost engagement, enhancing the photo gallery with real time updates, and resolving critical UI issues. With experience in development and project management, Ive led cross functional teams, streamlined workflows, and driven impactful features."}
                </p>
              </div>
            </div>
            <div className="flex flex-col pl-[50px] space-y-14">
            <div className="flex items-center justify-center">
              <div className="w-[150px] h-[150px] bg-gray-300 rounded-full">
              <img 
                src="/images/ETlogo.png" 
                alt="ETLogo" 
                style={{objectFit: 'fill', borderRadius:'100px'}}
              />
              </div>
            </div>
              <div className="w-[400px] h-[225px] bg-white rounded-lg shadow-md">
              <div style={{color:'black',fontSize:17,}} className='p-[10px]'>
                <p className='pt-[10px]'>
                  Eat Together is an on campus startup @ The University of Washington - Seattle that 
                  aims to connect students at the university over shared meals through a cross platform 
                  mobile application. The app aims to reshape the college experience by matching users 
                  with friendly individuals nearby to meet up and share a meal.
                </p>
                <a href = 'https://eat-together.org' style={{color:'blue',fontSize:17,}}> Check it out here!</a>
              </div>

              </div>
            </div>
          </div>
        </div>

        

      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
      </footer>
    </div>
  );
}
