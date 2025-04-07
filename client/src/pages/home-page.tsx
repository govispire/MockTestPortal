import { Link } from "wouter";
import { FaCalendarAlt, FaUserTie, FaChartLine, FaStar, FaAndroid, FaApple, FaChalkboardTeacher } from "react-icons/fa";
import { BiSolidBank, BiTestTube } from "react-icons/bi";
import { GiRailRoad, GiWheat } from "react-icons/gi";
import { BsDownload, BsArrowRight } from "react-icons/bs";
import { useAuth } from "@/hooks/use-auth";

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Section */}
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              MockPrep
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/#features" className="text-gray-700 hover:text-primary font-medium">Features</Link>
            <Link href="/#calendar" className="text-gray-700 hover:text-primary font-medium">Calendar</Link>
            <Link href="/#mentors" className="text-gray-700 hover:text-primary font-medium">Mentors</Link>
            <Link href="/#courses" className="text-gray-700 hover:text-primary font-medium">Courses</Link>
            <Link href="/#tests" className="text-gray-700 hover:text-primary font-medium">Test Series</Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <Link href="/dashboard" className="bg-primary hover:bg-primary/90 text-white font-medium rounded-lg py-2 px-4 transition-colors">
                Dashboard
              </Link>
            ) : (
              <>
                <Link href="/auth" className="hidden sm:inline-block text-primary hover:text-primary/90 font-medium">
                  Login
                </Link>
                <Link href="/auth" className="bg-primary hover:bg-primary/90 text-white font-medium rounded-lg py-2 px-4 transition-colors">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-12 md:py-20 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="container mx-auto px-4 flex flex-col-reverse md:flex-row items-center">
            <div className="md:w-1/2 mt-8 md:mt-0 md:pr-12">
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                Ace Your <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">Competitive Exams</span> with MockPrep
              </h1>
              <p className="text-lg text-gray-700 mb-8">
                India's most comprehensive exam preparation platform with personalized 
                calendar planning and dedicated mentor support.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link href="/auth" className="bg-primary hover:bg-primary/90 text-white text-center font-medium rounded-lg py-3 px-6 text-lg transition-colors">
                  Get Started for Free
                </Link>
                <Link href="/#features" className="bg-white text-primary border border-primary text-center font-medium rounded-lg py-3 px-6 text-lg hover:bg-gray-50 transition-colors">
                  Explore Features
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                alt="Students preparing for exams" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Unique Features Section */}
        <section id="features" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose MockPrep</h2>
              <p className="text-gray-700 max-w-2xl mx-auto">
                Our unique features are designed to give you an edge in your exam preparation journey
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-blue-50 p-8 rounded-xl shadow-sm">
                <div className="bg-primary/10 w-16 h-16 flex items-center justify-center rounded-full mb-4">
                  <FaCalendarAlt className="text-primary text-2xl" />
                </div>
                <h3 className="text-xl font-bold mb-3">India's First Calendar Feature</h3>
                <p className="text-gray-700 mb-4">
                  Plan your entire exam preparation journey with our intelligent calendar system.
                  Track exam dates, create personalized study schedules, and never miss a deadline.
                </p>
                <Link href="/#calendar" className="inline-flex items-center text-primary font-medium">
                  Learn more <BsArrowRight className="ml-2" />
                </Link>
              </div>
              
              <div className="bg-blue-50 p-8 rounded-xl shadow-sm">
                <div className="bg-primary/10 w-16 h-16 flex items-center justify-center rounded-full mb-4">
                  <FaUserTie className="text-primary text-2xl" />
                </div>
                <h3 className="text-xl font-bold mb-3">Personalized Mentor Support</h3>
                <p className="text-gray-700 mb-4">
                  Get guidance from experienced mentors who have cracked the exams you're preparing for.
                  Receive personalized feedback and strategies to improve your performance.
                </p>
                <Link href="/#mentors" className="inline-flex items-center text-primary font-medium">
                  Meet our mentors <BsArrowRight className="ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Calendar Functionality Section */}
        <section id="calendar" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-12 mb-8 md:mb-0">
                <h2 className="text-3xl font-bold mb-4">Master Your Study Schedule</h2>
                <p className="text-gray-700 mb-6">
                  Our intelligent calendar system is designed to help you organize your entire 
                  exam preparation journey effectively.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-primary/10 w-10 h-10 flex items-center justify-center rounded-full mr-4">
                      <span className="text-primary font-semibold">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Track Important Exam Dates</h3>
                      <p className="text-gray-600">Never miss application deadlines, exam dates or result announcements</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-primary/10 w-10 h-10 flex items-center justify-center rounded-full mr-4">
                      <span className="text-primary font-semibold">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Personalized Study Plans</h3>
                      <p className="text-gray-600">AI-generated study schedules based on your target exam and available time</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-primary/10 w-10 h-10 flex items-center justify-center rounded-full mr-4">
                      <span className="text-primary font-semibold">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Daily Task Management</h3>
                      <p className="text-gray-600">Organize your daily study tasks and track your progress in real-time</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="md:w-1/2 bg-white p-4 rounded-xl shadow-lg">
                <div className="rounded-lg overflow-hidden border border-gray-200">
                  <div className="bg-primary text-white p-4">
                    <h3 className="text-lg font-semibold">Your Study Calendar</h3>
                    <p className="text-sm opacity-90">May 2023</p>
                  </div>
                  
                  <div className="p-4">
                    <div className="grid grid-cols-7 gap-2 text-center text-sm mb-2">
                      <div>Sun</div>
                      <div>Mon</div>
                      <div>Tue</div>
                      <div>Wed</div>
                      <div>Thu</div>
                      <div>Fri</div>
                      <div>Sat</div>
                    </div>
                    
                    <div className="grid grid-cols-7 gap-2 text-center">
                      {[...Array(31)].map((_, i) => {
                        const day = i + 1;
                        const isExamDay = day === 15;
                        const isTaskDay = [3, 7, 12, 18, 22, 26].includes(day);
                        return (
                          <div key={i} className={`
                            p-2 rounded-lg text-sm
                            ${isExamDay ? 'bg-red-100 text-red-800 font-medium' : ''}
                            ${isTaskDay ? 'bg-blue-100 text-blue-800' : ''}
                          `}>
                            {day}
                          </div>
                        );
                      })}
                    </div>
                    
                    <div className="mt-4 space-y-2">
                      <div className="p-2 bg-red-50 border-l-4 border-red-500 rounded">
                        <span className="text-xs font-medium text-red-800">15 May</span>
                        <p className="text-sm font-medium">Banking Exam</p>
                      </div>
                      <div className="p-2 bg-blue-50 border-l-4 border-blue-500 rounded">
                        <span className="text-xs font-medium text-blue-800">12 May</span>
                        <p className="text-sm font-medium">Complete Mock Test #4</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mentor Support Section */}
        <section id="mentors" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Learn from the Best Mentors</h2>
              <p className="text-gray-700 max-w-2xl mx-auto">
                Our mentors are exam toppers and subject experts who will guide you through your preparation journey
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm transition-all hover:shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" 
                  alt="Mentor - Rajesh Kumar" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <h3 className="font-bold text-lg mb-1">Rajesh Kumar</h3>
                  <p className="text-primary text-sm mb-3">Banking Exam Expert</p>
                  <p className="text-gray-600 text-sm mb-4">
                    Ex-SBI Officer with 8+ years of teaching experience. Helped 500+ students crack banking exams.
                  </p>
                  <div className="bg-gray-50 p-3 rounded-lg italic text-sm text-gray-600">
                    "Rajesh sir's strategies for solving quantitative aptitude questions changed my approach completely."
                    <div className="mt-2 font-medium text-gray-800">- Priya S. (SBI PO)</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm transition-all hover:shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80" 
                  alt="Mentor - Ananya Sharma" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <h3 className="font-bold text-lg mb-1">Ananya Sharma</h3>
                  <p className="text-primary text-sm mb-3">SSC & Railway Expert</p>
                  <p className="text-gray-600 text-sm mb-4">
                    AIR 12 in SSC CGL. Specialized in General Awareness and Reasoning sections with 5+ years of mentoring.
                  </p>
                  <div className="bg-gray-50 p-3 rounded-lg italic text-sm text-gray-600">
                    "Ananya ma'am's current affairs notes and daily quizzes were game-changers for my preparation."
                    <div className="mt-2 font-medium text-gray-800">- Rahul M. (SSC CGL)</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm transition-all hover:shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" 
                  alt="Mentor - Dr. Vikram Singh" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <h3 className="font-bold text-lg mb-1">Dr. Vikram Singh</h3>
                  <p className="text-primary text-sm mb-3">Agriculture Exam Specialist</p>
                  <p className="text-gray-600 text-sm mb-4">
                    PhD in Agricultural Sciences with experience in ICAR and other agriculture exam preparations.
                  </p>
                  <div className="bg-gray-50 p-3 rounded-lg italic text-sm text-gray-600">
                    "Dr. Singh's conceptual clarity and detailed study materials were instrumental in my success."
                    <div className="mt-2 font-medium text-gray-800">- Arjun T. (ICAR NET)</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-10">
              <Link href="/auth" className="inline-flex items-center bg-primary hover:bg-primary/90 text-white font-medium rounded-lg py-3 px-6 transition-colors">
                Connect with a Mentor <BsArrowRight className="ml-2" />
              </Link>
            </div>
          </div>
        </section>

        {/* Course Categories Section */}
        <section id="courses" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Comprehensive Exam Categories</h2>
              <p className="text-gray-700 max-w-2xl mx-auto">
                From banking to agriculture, we cover all major competitive exams in India
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100">
                <div className="mx-auto w-16 h-16 flex items-center justify-center bg-primary/10 rounded-full mb-4">
                  <BiSolidBank className="text-primary text-2xl" />
                </div>
                <h3 className="font-semibold">Banking & Insurance</h3>
                <p className="text-sm text-gray-600 mt-2">SBI, IBPS, RBI, LIC</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100">
                <div className="mx-auto w-16 h-16 flex items-center justify-center bg-primary/10 rounded-full mb-4">
                  <GiRailRoad className="text-primary text-2xl" />
                </div>
                <h3 className="font-semibold">SSC/Railway</h3>
                <p className="text-sm text-gray-600 mt-2">SSC CGL, CHSL, Railway</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100">
                <div className="mx-auto w-16 h-16 flex items-center justify-center bg-primary/10 rounded-full mb-4">
                  <GiWheat className="text-primary text-2xl" />
                </div>
                <h3 className="font-semibold">Agriculture</h3>
                <p className="text-sm text-gray-600 mt-2">ICAR, IARI, AFO</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100">
                <div className="mx-auto w-16 h-16 flex items-center justify-center bg-primary/10 rounded-full mb-4">
                  <FaChalkboardTeacher className="text-primary text-2xl" />
                </div>
                <h3 className="font-semibold">Teaching</h3>
                <p className="text-sm text-gray-600 mt-2">CTET, UPTET, NET</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100">
                <div className="mx-auto w-16 h-16 flex items-center justify-center bg-primary/10 rounded-full mb-4">
                  <BiTestTube className="text-primary text-2xl" />
                </div>
                <h3 className="font-semibold">Engineering</h3>
                <p className="text-sm text-gray-600 mt-2">GATE, ESE, PSUs</p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-primary text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2 flex items-center justify-center">
                  <FaStar className="text-yellow-300 mr-2" />
                  4.55/5
                </div>
                <p className="text-blue-100">Play Store Rating</p>
              </div>
              
              <div>
                <div className="text-4xl font-bold mb-2">1M+</div>
                <p className="text-blue-100">App Downloads</p>
              </div>
              
              <div>
                <div className="text-4xl font-bold mb-2">50M+</div>
                <p className="text-blue-100">Mock Tests Taken</p>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Test Series Section */}
        <section id="tests" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Popular Test Series</h2>
              <p className="text-gray-700 max-w-2xl mx-auto">
                Practice with our comprehensive test series designed by experts
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "SBI PO Complete Package",
                  tests: 50,
                  students: "10K+",
                  rating: 4.8,
                  category: "Banking"
                },
                {
                  title: "SSC CGL Tier 1 & 2",
                  tests: 75,
                  students: "15K+",
                  rating: 4.7,
                  category: "SSC"
                },
                {
                  title: "RRB NTPC Special",
                  tests: 60,
                  students: "12K+",
                  rating: 4.6,
                  category: "Railway"
                },
                {
                  title: "IBPS Clerk Master Series",
                  tests: 45,
                  students: "8K+",
                  rating: 4.9,
                  category: "Banking"
                },
                {
                  title: "ICAR NET Agriculture",
                  tests: 30,
                  students: "5K+",
                  rating: 4.7,
                  category: "Agriculture"
                },
                {
                  title: "CTET Paper I & II",
                  tests: 40,
                  students: "7K+",
                  rating: 4.5,
                  category: "Teaching"
                }
              ].map((test, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          {test.category}
                        </span>
                        <h3 className="font-bold text-lg mt-2">{test.title}</h3>
                      </div>
                      <div className="flex items-center bg-green-50 px-2 py-1 rounded">
                        <FaStar className="text-yellow-500 mr-1" />
                        <span className="text-sm font-medium">{test.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-gray-600 text-sm mb-6">
                      <div className="mr-4">{test.tests} Mock Tests</div>
                      <div>{test.students} Students</div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:justify-between space-y-2 sm:space-y-0">
                      <Link href="/auth" className="bg-primary hover:bg-primary/90 text-white font-medium rounded-lg py-2 px-4 text-center sm:text-left transition-colors">
                        Start Now
                      </Link>
                      <Link href="/auth" className="text-primary hover:text-primary/90 font-medium py-2 px-4 text-center sm:text-left">
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call-to-Action Section */}
        <section className="py-16 bg-gradient-to-br from-primary/90 to-blue-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Exam Preparation?</h2>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8">
              Join thousands of successful candidates who have transformed their preparation journey with MockPrep
            </p>
            <Link href="/auth" className="inline-block bg-white text-primary hover:bg-gray-100 font-bold rounded-lg py-4 px-8 text-lg transition-colors">
              Sign Up for Free
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold text-white mb-4">MockPrep</div>
              <p className="mb-4">India's leading exam preparation platform with personalized learning experience.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/#features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/#calendar" className="hover:text-white transition-colors">Calendar</Link></li>
                <li><Link href="/#mentors" className="hover:text-white transition-colors">Mentors</Link></li>
                <li><Link href="/#courses" className="hover:text-white transition-colors">Courses</Link></li>
                <li><Link href="/#tests" className="hover:text-white transition-colors">Test Series</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Refund Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Download App</h3>
              <p className="mb-4">Get the MockPrep mobile app for a better experience</p>
              <div className="space-y-3">
                <a href="#" className="flex items-center space-x-3 bg-gray-800 hover:bg-gray-700 rounded-lg px-4 py-2 transition-colors">
                  <FaAndroid className="text-2xl" />
                  <div>
                    <div className="text-xs">Download on</div>
                    <div className="text-white font-medium">Google Play</div>
                  </div>
                </a>
                <a href="#" className="flex items-center space-x-3 bg-gray-800 hover:bg-gray-700 rounded-lg px-4 py-2 transition-colors">
                  <FaApple className="text-2xl" />
                  <div>
                    <div className="text-xs">Download on</div>
                    <div className="text-white font-medium">App Store</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
            <p>&copy; {new Date().getFullYear()} MockPrep. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
