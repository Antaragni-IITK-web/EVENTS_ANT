"use client";

import { useState } from "react";
import ProtectedRoute from "../../components/ProtectedRoute";
import { StaggeredFadeIn } from "../../components/FadeIn";
import { Profile } from "../../components/Profile";
import { Team } from "../../components/Team";
import { Competitions } from "../../components/AvailableCompetitions";
import { Registrations } from "../../components/Registrations";
import { useStore } from "@repo/store";

const TABS = ["Profile", "Team", "Registrations", "Competitions"];

export default function EventDetails() {
	const [activeTab, setActiveTab] = useState(TABS[3]);
	const { loading, user } = useStore();

	if (loading) return;

	return (
		<ProtectedRoute>
			<section className="min-h-screen pt-16 pb-10">
				<div className="container mx-auto px-6">
					<div className="mb-12 pt-16 text-center">
						<p className="eyebrow mb-4">Your festival HQ</p>
						<h1 className="font-title text-gradient mx-auto w-fit text-4xl font-black md:!text-6xl">
							{user?.details?.name ?
								`Hey, ${String(user.details.name).split(" ")[0]}`
							:	"Dashboard"}
						</h1>
						{user?.details?.id && (
							<p className="chip mt-5 !text-[10px]" style={{ color: "var(--lime)" }}>
								Antaragni ID &middot; {user.details.id}
							</p>
						)}
					</div>
				</div>
				<div className="max-w-7xl mx-auto">
					<div className="glass mx-auto mb-10 flex w-fit max-w-full justify-center gap-1 overflow-x-auto rounded-full p-1.5">
						{TABS.map((tab) => (
							<button
								key={tab}
								onClick={() => setActiveTab(tab)}
								className={`shrink-0 rounded-full px-5 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
									activeTab === tab ?
										"text-[#0a0612]"
									:	"text-foreground/60 hover:text-foreground"
								}`}
								style={
									activeTab === tab ? { background: "var(--lime)" } : undefined
								}
							>
								{tab}
							</button>
						))}
					</div>

					{activeTab === "Profile" && (
						<StaggeredFadeIn>
							<Profile />
						</StaggeredFadeIn>
					)}

					{activeTab === "Team" && (
						<StaggeredFadeIn>
							<Team />
						</StaggeredFadeIn>
					)}

					{activeTab === "Competitions" && (
						<StaggeredFadeIn>
							<Competitions />
						</StaggeredFadeIn>
					)}

					{activeTab === "Registrations" && (
						<StaggeredFadeIn>
							<Registrations />
						</StaggeredFadeIn>
					)}
				</div>
			</section>
		</ProtectedRoute>
	);
}
