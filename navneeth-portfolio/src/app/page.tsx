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
        <div className="items-center">

        </div>

        <div className="bg-gray-100 rounded-2xl p-6 shadow-md w-[1000px] h-[550px] mx-auto">
          <h2 className="text-xl font-semibold text-gray-700 text-center mb-4" style={{ fontSize: '40px' }}>
            Stock Prediction Model
          </h2>
          <div className="flex flex-row items-start space-x-5">
            <div className="w-[500px] h-[430px] bg-white rounded-xl shadow-md">
              <p style={{color:'black'}} className='p-[10px]'>
                Hello
              </p>
            </div>
            <div className="flex flex-col pl-[50px] space-y-14">
              <div className="w-[400px] h-[200px] bg-gray-300 rounded-lg"></div>
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
