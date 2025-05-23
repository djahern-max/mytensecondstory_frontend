import React, { useState } from 'react';

const LandingPage = () => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleEmailSubmit = async () => {
        if (!email || !email.includes('@')) return;

        setIsLoading(true);

        // Simulate API call - replace with actual API endpoint
        setTimeout(() => {
            setIsSubmitted(true);
            setIsLoading(false);
            setEmail('');
        }, 1500);
    };

    const features = [
        {
            icon: "🎥",
            title: "10-Second Video Intros",
            description: "Create compelling video introductions that make memorable first impressions"
        },
        {
            icon: "🤖",
            title: "AI-Powered Customization",
            description: "Transform your videos with smart prompts and personalized messaging"
        },
        {
            icon: "🔗",
            title: "Professional Integration",
            description: "Link to LinkedIn, resumes, portfolios, and share across all platforms"
        },
        {
            icon: "📱",
            title: "Mobile-First Design",
            description: "Seamlessly works on web and mobile, designed for real-world networking"
        }
    ];

    const useCases = [
        {
            title: "Professional Networking",
            description: "Stand out on LinkedIn with video introductions that get responses",
            gradient: "from-blue-500 to-purple-600"
        },
        {
            title: "Job Applications",
            description: "Make your applications memorable with personalized video messages",
            gradient: "from-green-500 to-teal-600"
        },
        {
            title: "Social Connections",
            description: "Break the ice with new people without being intrusive",
            gradient: "from-pink-500 to-rose-600"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute top-40 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
                <div className="absolute bottom-20 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
            </div>

            {/* Header */}
            <header className="relative z-10 px-6 py-6">
                <nav className="max-w-6xl mx-auto flex justify-between items-center">
                    <div className="text-2xl font-bold text-white">
                        MyTenSecondStory
                    </div>
                    <div className="hidden md:flex space-x-8 text-gray-300">
                        <a href="#features" className="hover:text-white transition-colors">Features</a>
                        <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
                        <a href="#use-cases" className="hover:text-white transition-colors">Use Cases</a>
                    </div>
                </nav>
            </header>

            {/* Hero Section */}
            <section className="relative z-10 px-6 py-20">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                        Your Story in
                        <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            {" "}10 Seconds
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                        Create powerful video introductions that open doors, build connections, and make you unforgettable in professional and social settings.
                    </p>

                    {/* Email Signup Form */}
                    <div className="max-w-md mx-auto mb-12">
                        {!isSubmitted ? (
                            <div className="flex flex-col sm:flex-row gap-4">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="flex-1 px-6 py-4 text-lg rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                                <button
                                    onClick={handleEmailSubmit}
                                    disabled={isLoading || !email || !email.includes('@')}
                                    className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? (
                                        <div className="flex items-center justify-center">
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                            Joining...
                                        </div>
                                    ) : (
                                        'Get Early Access'
                                    )}
                                </button>
                            </div>
                        ) : (
                            <div className="bg-green-500/20 backdrop-blur-md border border-green-500/30 rounded-full px-8 py-4 text-green-300 text-center">
                                🎉 Thanks! You're on the list for early access.
                            </div>
                        )}
                    </div>

                    <p className="text-gray-400 text-sm">
                        Join 1,000+ professionals waiting for launch • No spam, ever
                    </p>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="relative z-10 px-6 py-20 bg-black/20 backdrop-blur-sm">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
                        Why Choose MyTenSecondStory?
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="text-center group">
                                <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="relative z-10 px-6 py-20">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-16">
                        Simple. Powerful. Effective.
                    </h2>

                    <div className="grid md:grid-cols-3 gap-12">
                        <div className="relative">
                            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-6">
                                1
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-4">Record Your Story</h3>
                            <p className="text-gray-400">Create a 10-second video introduction using your phone or camera</p>
                        </div>

                        <div className="relative">
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-6">
                                2
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-4">AI Enhancement</h3>
                            <p className="text-gray-400">Use AI prompts to customize your message for different audiences</p>
                        </div>

                        <div className="relative">
                            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-6">
                                3
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-4">Share & Connect</h3>
                            <p className="text-gray-400">Send via LinkedIn, email, text, or any platform to make meaningful connections</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Use Cases */}
            <section id="use-cases" className="relative z-10 px-6 py-20 bg-black/20 backdrop-blur-sm">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
                        Perfect For Every Situation
                    </h2>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {useCases.map((useCase, index) => (
                            <div key={index} className={`bg-gradient-to-br ${useCase.gradient} p-8 rounded-2xl text-white transform hover:scale-105 transition-all duration-300`}>
                                <h3 className="text-2xl font-bold mb-4">{useCase.title}</h3>
                                <p className="text-white/90 leading-relaxed">{useCase.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative z-10 px-6 py-20">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                        Ready to Transform Your Networking?
                    </h2>

                    <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
                        Join thousands of professionals who are already using video to create meaningful connections and unlock new opportunities.
                    </p>

                    <div className="max-w-md mx-auto">
                        {!isSubmitted ? (
                            <div className="flex flex-col sm:flex-row gap-4">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Your email address"
                                    className="flex-1 px-6 py-4 text-lg rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                                <button
                                    onClick={handleEmailSubmit}
                                    disabled={isLoading || !email || !email.includes('@')}
                                    className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 disabled:opacity-50"
                                >
                                    {isLoading ? 'Joining...' : 'Start Your Story'}
                                </button>
                            </div>
                        ) : (
                            <div className="bg-green-500/20 backdrop-blur-md border border-green-500/30 rounded-full px-8 py-4 text-green-300 text-center">
                                🎉 Welcome to the MyTenSecondStory community!
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 px-6 py-12 bg-black/40 backdrop-blur-sm">
                <div className="max-w-6xl mx-auto text-center">
                    <div className="text-2xl font-bold text-white mb-4">MyTenSecondStory</div>
                    <p className="text-gray-400 mb-8">Your story. Your connections. Your success.</p>

                    <div className="flex justify-center space-x-8 text-gray-400">
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms</a>
                        <a href="#" className="hover:text-white transition-colors">Contact</a>
                    </div>

                    <div className="mt-8 pt-8 border-t border-gray-800 text-gray-500 text-sm">
                        © 2025 MyTenSecondStory. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;