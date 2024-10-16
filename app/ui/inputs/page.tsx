import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { buttonVariants } from "@/components/ui/button"
import { Mail, Lock, Search, User, MessageSquare } from "lucide-react"

export default function FormComponentsShowcase() {
    return (
        <div className="min-h-screen bg-zinc-900 p-8">
            <div className="mx-auto max-w-2xl space-y-8">
                <section className="space-y-4">
                    <h2 className="text-lg font-semibold text-green-400">Text Inputs</h2>
                    <div className="space-y-4">
                        <div className="relative">
                            <Input placeholder="Enter your username" />
                            <User className="absolute right-3 top-2.5 h-5 w-5 text-green-400/30" />
                        </div>

                        <div className="relative">
                            <Input type="email" placeholder="Enter your email" />
                            <Mail className="absolute right-3 top-2.5 h-5 w-5 text-green-400/30" />
                        </div>

                        <div className="relative">
                            <Input type="password" placeholder="Enter your password" />
                            <Lock className="absolute right-3 top-2.5 h-5 w-5 text-green-400/30" />
                        </div>

                        <div className="relative">
                            <Input placeholder="Search..." />
                            <Search className="absolute right-3 top-2.5 h-5 w-5 text-green-400/30" />
                        </div>
                    </div>
                </section>

                {/* Input States */}
                <section className="space-y-4">
                    <h2 className="text-lg font-semibold text-green-400">Input States</h2>
                    <div className="grid gap-4">
                        <Input placeholder="Default input" />
                        <Input placeholder="Disabled input" disabled />
                        <Input placeholder="With value" value="John Doe" readOnly />
                    </div>
                </section>

                {/* Textarea Section */}
                <section className="space-y-4">
                    <h2 className="text-lg font-semibold text-green-400">Textarea</h2>
                    <div className="space-y-4">
                        <div className="relative">
                            <Textarea
                                placeholder="Write your message here..."
                            />
                            <MessageSquare className="absolute right-3 top-3 h-5 w-5 text-green-400/30" />
                        </div>

                        <Textarea
                            placeholder="Disabled textarea"
                            disabled
                        />
                    </div>
                </section>

                {/* Form Example */}
                <section className="space-y-4">
                    <h2 className="text-lg font-semibold text-green-400">Contact Form Example</h2>
                    <form className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <Input placeholder="First Name" />
                            <Input placeholder="Last Name" />
                        </div>
                        <Input type="email" placeholder="Email Address" />
                        <Textarea placeholder="Your Message" />
                        <button className={buttonVariants()}>
                            Send Message
                        </button>
                    </form>
                </section>
            </div>
        </div>
    )
}