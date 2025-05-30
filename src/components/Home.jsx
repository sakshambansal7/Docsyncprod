import React from 'react';
import { Link } from 'react-router-dom';
// Custom SVG icons to replace Lucide React
const CloudLockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7.5 7.5a5 5 0 0 1 9.9-1A5 5 0 1 1 22 12v2"/>
    <rect x="8" y="15" width="8" height="8" rx="1"/>
    <path d="M10 15v-2a2 2 0 1 1 4 0v2"/>
  </svg>
);

const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const TargetIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="6"/>
    <circle cx="12" cy="12" r="2"/>
  </svg>
);

const ZapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const UploadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="17 8 12 3 7 8"/>
    <line x1="12" y1="3" x2="12" y2="15"/>
  </svg>
);

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const SmartphoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
    <line x1="12" y1="18" x2="12" y2="18.01"/>
  </svg>
);

const DocSyncLandingPage = () => {
 
  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      {/* Navigation */}
      <nav className="bg-white shadow-sm py-4 px-8 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-blue-600 mr-2">
            <CloudLockIcon />
          </span>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">DocSync</span>
        </div>
        <div className="hidden md:flex space-x-8">
          <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-blue-600 transition-colors">How It Works</a>
          <a href="#testimonials" className="hover:text-blue-600 transition-colors">Testimonials</a>
          <a href="#faq" className="hover:text-blue-600 transition-colors">FAQ</a>
        </div>
        <div>
      <Link to="/login">
        <button className="px-4 py-2 mr-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors">
          Log In
        </button>
      </Link>
      <Link to="/signup">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-md">
          Sign Up
        </button>
      </Link>
    </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 px-8 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Secure Your Documents, <br />
              <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">Track Your Goals</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Your digital locker for secure document storage and exam goal tracking in one place.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-lg text-lg font-medium">
                Get Started — It's Free
              </button>
              <button className="px-8 py-3 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors text-lg font-medium">
                Learn More
              </button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="w-full max-w-md relative">
              <div className="bg-white rounded-2xl shadow-xl p-6 relative z-10">
                <div className="bg-blue-50 rounded-xl p-8 flex items-center justify-center mb-6">
                  <span className="text-blue-600" style={{ transform: 'scale(3)' }}>
                    <CloudLockIcon />
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-100 rounded-lg p-4 flex flex-col items-center">
                    <div className="text-sm text-gray-500 mb-1">Aadhaar</div>
                    <div className="font-bold">XXXX-XXXX-1234</div>
                  </div>
                  <div className="bg-blue-100 rounded-lg p-4 flex flex-col items-center">
                    <div className="text-sm text-gray-500 mb-1">PAN</div>
                    <div className="font-bold">ABCDE1234F</div>
                  </div>
                  <div className="bg-blue-100 rounded-lg p-4 flex flex-col items-center">
                    <div className="text-sm text-gray-500 mb-1">Marksheet</div>
                    <div className="font-bold">94.5%</div>
                  </div>
                  <div className="bg-blue-100 rounded-lg p-4 flex flex-col items-center">
                    <div className="text-sm text-gray-500 mb-1">GATE Score</div>
                    <div className="font-bold">850/1000</div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-blue-100 w-full h-full rounded-2xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Essential Features for Document Management
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100">
              <div className="bg-blue-50 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <span className="text-blue-600">
                  <ShieldIcon />
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3">Secure Document Storage</h3>
              <p className="text-gray-600">
                Upload and access your government IDs, academic records, and personal details anytime.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100">
              <div className="bg-blue-50 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <span className="text-blue-600">
                  <TargetIcon />
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3">Goal Tracking</h3>
              <p className="text-gray-600">
                Set and track your exam goals with a progress bar and deadlines that keep you accountable.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100">
              <div className="bg-blue-50 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <span className="text-blue-600">
                  <ZapIcon />
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3">Instant Access</h3>
              <p className="text-gray-600">
                Retrieve stored information on demand for applications, exams, or verification.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100">
              <div className="bg-blue-50 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <span className="text-blue-600">
                  <ShieldIcon />
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3">Privacy & Security</h3>
              <p className="text-gray-600">
                End-to-end encryption ensures your personal data remains protected at all times.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 px-8 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-600 rounded-full w-16 h-16 flex items-center justify-center mb-6 shadow-md">
                <span className="text-white">
                  <UserIcon />
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3">Sign Up & Secure Your Profile</h3>
              <p className="text-gray-600">
                Create your account with a secure password and set up two-factor authentication.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-600 rounded-full w-16 h-16 flex items-center justify-center mb-6 shadow-md">
                <span className="text-white">
                  <UploadIcon />
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3">Upload Essential Documents</h3>
              <p className="text-gray-600">
                Scan and upload your IDs, certificates, and other important documents.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-600 rounded-full w-16 h-16 flex items-center justify-center mb-6 shadow-md">
                <span className="text-white">
                  <CalendarIcon />
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3">Set Exam Goals & Deadlines</h3>
              <p className="text-gray-600">
                Define your educational targets with specific deadlines and milestones.
              </p>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-600 rounded-full w-16 h-16 flex items-center justify-center mb-6 shadow-md">
                <span className="text-white">
                  <SmartphoneIcon />
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3">Access & Manage Anytime</h3>
              <p className="text-gray-600">
                Get instant access to your documents and goal progress from any device.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our Users Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-bold">RS</span>
                </div>
                <div>
                  <h4 className="font-bold">Rahul Sharma</h4>
                  <p className="text-gray-500 text-sm">Engineering Student</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "DocSync has been a lifesaver for my college applications. Having all my documents in one place saved me hours of searching and organizing."
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-bold">PM</span>
                </div>
                <div>
                  <h4 className="font-bold">Priya Mehta</h4>
                  <p className="text-gray-500 text-sm">UPSC Aspirant</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The goal tracking feature keeps me accountable for my exam preparation. I love how I can visualize my progress and stay motivated."
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-bold">AK</span>
                </div>
                <div>
                  <h4 className="font-bold">Amar Kumar</h4>
                  <p className="text-gray-500 text-sm">IT Professional</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "As someone who values privacy, I appreciate the security features DocSync offers. It's convenient and gives me peace of mind knowing my documents are safe."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-8 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Organize Your Documents?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of students and professionals who trust DocSync with their important documents and goals.
          </p>
          <button className="px-8 py-4 bg-white text-blue-600 rounded-md hover:bg-blue-50 transition-colors shadow-lg text-lg font-medium">
            Sign Up for Free
          </button>
          <p className="mt-4 text-sm opacity-75">
            No credit card required. Get started in less than 2 minutes.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {/* FAQ Item 1 */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">How secure is DocSync?</h3>
              <p className="text-gray-600">
                DocSync uses bank-level encryption to protect your data. All documents are encrypted end-to-end, and we implement two-factor authentication to ensure only you can access your information.
              </p>
            </div>

            {/* FAQ Item 2 */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">Can I access my documents offline?</h3>
              <p className="text-gray-600">
                Yes, you can download your documents for offline access. Once you're back online, any changes you've made will sync automatically with your account.
              </p>
            </div>

            {/* FAQ Item 3 */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">What file formats are supported?</h3>
              <p className="text-gray-600">
                DocSync supports all common document formats including PDF, JPEG, PNG, DOC/DOCX, XLS/XLSX, and more. You can upload files up to 25MB in size.
              </p>
            </div>

            {/* FAQ Item 4 */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">Is DocSync available on mobile devices?</h3>
              <p className="text-gray-600">
                Yes, DocSync is fully responsive and works on all devices. We also offer dedicated mobile apps for iOS and Android for an enhanced experience on the go.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-8 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center mb-4">
                <span className="text-blue-400 mr-2">
                  <CloudLockIcon />
                </span>
                <span className="text-xl font-bold text-white">DocSync</span>
              </div>
              <p className="text-gray-400 max-w-xs">
                Your secure digital locker for document storage and goal tracking.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-bold mb-4">Product</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Security</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">Company</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500">
            <p>© 2025 DocSync. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DocSyncLandingPage;