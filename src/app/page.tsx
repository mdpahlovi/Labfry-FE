import Button from "@/components/ui/Button";
import Image from "next/image";
import Role from "../components/ui/Role";

export default function HomePage() {
    return (
        <div className="min-h-screen flex flex-col">
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-18">
                        <Image src="/logo.png" alt="Logo" width={118} height={50} />
                        <div className="flex items-center gap-4">
                            <Button variant="outline">
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                                <span>Profile</span>
                            </Button>
                            <Button variant="primary">
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                    <polyline points="16 17 21 12 16 7"></polyline>
                                    <line x1="21" y1="12" x2="9" y2="12"></line>
                                </svg>
                                <span>Logout</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="max-w-7xl mx-auto flex-1 flex justify-center items-center px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold text-gray-900">
                        Welcome to <span className="text-red-600">Labfry</span>
                    </h1>
                    <p className="text-gray-600">
                        Role:{" "}
                        <span className="font-semibold text-red-600">
                            <Role />
                        </span>
                    </p>
                    <p className="text-gray-600 max-w-2xl mx-auto">Your secure authentication and user management platform</p>
                </div>
            </div>
        </div>
    );
}
