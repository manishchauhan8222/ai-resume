import Header from "@/components/custom/Header";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkles, FileText, Brain, ArrowRight } from "lucide-react";
import React from "react";

function Home() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-20 bg-gradient-to-b from-white to-blue-50">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight max-w-3xl">
          Build a <span className="text-blue-600">Professional Resume</span> in
          Minutes with <span className="text-primary">AI</span>
        </h1>
        <p className="mt-6 text-lg text-gray-600 max-w-2xl">
          Effortlessly craft a resume that gets noticed. Our AI-powered builder
          helps you create a job-winning resume tailored to your career goals.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Link to="/dashboard">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl flex items-center gap-2 text-lg">
              Get Started <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button
              variant="outline"
              className="px-6 py-3 rounded-2xl border-2 border-gray-300 text-gray-700 hover:bg-gray-100 text-lg"
            >
              Browse Templates
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
        <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition">
          <Sparkles className="text-blue-600 w-10 h-10 mb-4" />
          <h3 className="text-xl font-semibold mb-2">AI Suggestions</h3>
          <p className="text-gray-600">
            Get smart AI recommendations to improve your resume and land your
            dream job faster.
          </p>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition">
          <FileText className="text-blue-600 w-10 h-10 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Ready-to-Use Templates</h3>
          <p className="text-gray-600">
            Choose from modern, ATS-friendly resume templates designed by
            professionals.
          </p>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition">
          <Brain className="text-blue-600 w-10 h-10 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Smart Editing</h3>
          <p className="text-gray-600">
            Easily edit and customize your resume sections with real-time
            preview.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Build Your Dream Resume?
        </h2>
        <p className="mb-8 text-lg">
          Start creating your AI-powered resume today and stand out from the
          crowd.
        </p>
        <Link to="/dashboard">
          <Button className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-2xl text-lg hover:bg-gray-100">
            Create Resume Now
          </Button>
        </Link>
      </section>
    </div>
  );
}

export default Home;
