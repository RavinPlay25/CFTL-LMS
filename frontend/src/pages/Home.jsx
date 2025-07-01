import { FaGraduationCap, FaBook, FaChalkboardTeacher, FaUserGraduate, FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaLinkedin, FaYoutube } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="font-sans">
      {/* Navigation Bar */}
      <nav className="bg-blue-900 text-white shadow-lg">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <FaGraduationCap className="text-2xl" />
            <span className="text-xl font-bold">CFTL LMS</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#" className="hover:text-blue-200">Home</a>
            <a href="#" className="hover:text-blue-200">Courses</a>
            <a href="#" className="hover:text-blue-200">Faculty</a>
            <a href="#" className="hover:text-blue-200">Resources</a>
            <a href="#" className="hover:text-blue-200">Contact</a>
          </div>
          <div className="flex space-x-4">
            <a href="/parent-login" className="px-4 py-2 bg-blue-700 rounded hover:bg-blue-600">Parent Login</a>
            <a href="/teacher-login" className="px-4 py-2 bg-green-700 rounded hover:bg-green-600">Teacher Login</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">Welcome to CFTL Learning Management System</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Empowering students and educators with cutting-edge digital learning solutions in Sri Lanka
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/student-register" className="px-8 py-3 bg-white text-blue-800 font-bold rounded-lg hover:bg-gray-100">
              Register as Student
            </a>
            <a href="/teacher-register" className="px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-blue-800">
              Join as Educator
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Choose CFTL?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <FaBook className="text-4xl text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Comprehensive Courses</h3>
              <p className="text-gray-600">
                Access to a wide range of courses designed for fast-track learning and skill development.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <FaChalkboardTeacher className="text-4xl text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Expert Faculty</h3>
              <p className="text-gray-600">
                Learn from industry professionals and experienced educators dedicated to your success.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <FaUserGraduate className="text-4xl text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Flexible Learning</h3>
              <p className="text-gray-600">
                Study at your own pace with our hybrid learning model combining online and in-person sessions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">About College of Fast Track Learning</h2>
              <p className="text-gray-600 mb-4">
                Established in 2010, CFTL has been at the forefront of innovative education in Sri Lanka, providing accelerated learning programs that help students achieve their academic and professional goals faster.
              </p>
              <p className="text-gray-600 mb-4">
                Our Learning Management System integrates cutting-edge technology with proven pedagogical approaches to deliver exceptional learning experiences.
              </p>
              <p className="text-gray-600">
                With campuses across Sri Lanka and a growing online presence, we're committed to making quality education accessible to all.
              </p>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
                alt="CFTL Campus" 
                className="rounded-lg shadow-xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-12 pb-6">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <FaGraduationCap className="mr-2" /> CFTL LMS
              </h3>
              <p className="text-gray-400">
                Empowering the next generation of learners through innovative education technology.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Courses</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Admissions</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center"><FaMapMarkerAlt className="mr-2" /> 123 Education Ave, Colombo, Sri Lanka</li>
                <li className="flex items-center"><FaPhone className="mr-2" /> +94 11 234 5678</li>
                <li className="flex items-center"><FaEnvelope className="mr-2" /> info@cftl.edu.lk</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white"><FaFacebook size={20} /></a>
                <a href="#" className="text-gray-400 hover:text-white"><FaTwitter size={20} /></a>
                <a href="#" className="text-gray-400 hover:text-white"><FaLinkedin size={20} /></a>
                <a href="#" className="text-gray-400 hover:text-white"><FaYoutube size={20} /></a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} College of Fast Track Learning. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}