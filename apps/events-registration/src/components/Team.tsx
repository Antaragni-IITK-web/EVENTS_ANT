"use client";

import { queryData, updateData } from "@repo/firebase";
import { useStore } from "@repo/store";
import { useState, useEffect } from "react";
import { DocumentData } from "firebase/firestore";
import { Input } from "@repo/ui/input";
import toast from "react-hot-toast";

interface TeamMember {
    uid: string;
    data: {
        id: string;
        teamName: string;
        name: string;
        phone: string;
    };
}

export const Team = () => {
    const { user } = useStore();
    const [team, setTeam] = useState<TeamMember[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    
    const [newMemberId, setNewMemberId] = useState("");
    const [isAdding, setIsAdding] = useState(false);

    const getTeamDetails = async () => {
        if (!user?.details.teamId) {
            setIsLoading(false);
            return;
        }
        try {
            setIsLoading(true);
            const data: DocumentData[] = await queryData("eventsUsers2026", "teamId", user.details.teamId);
            setTeam(data as TeamMember[]);
        } catch (error) {
            console.error("Error fetching team details:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getTeamDetails();
    }, [user]);

    const handleAddMember = async () => {
        if (!newMemberId.trim()) return;
        
        setIsAdding(true);
        try {
            const data: DocumentData[] = await queryData("eventsUsers2026", "id", newMemberId.trim().toUpperCase());
            
            if (!data || data.length === 0) {
                toast.error("User not found.");
                return;
            }

            const targetUser = data[0];

            if (!targetUser) {
                toast.error("User not found.");
                return;
            }

            if (targetUser.data.teamId === user?.details?.teamId) {
                toast.error("User is already a member of your team.");
                return;
            }

            if (targetUser.data.teamName === "SOLO") {
                await updateData("eventsUsers2026", targetUser.uid, {
                    teamId: user!.details.teamId,
                    teamName: user!.details.teamName,
                });
                toast.success("Member successfully added to your team!");
                setNewMemberId("");
                await getTeamDetails();
            } else {
                toast.error("User is already part of another team.");
            }
        } catch (error) {
            console.error("Error adding member:", error);
            toast.error("An error occurred while adding member.");
        } finally {
            setIsAdding(false);
        }
    };

    if (isLoading) {
        return (
            <div className="bg-foreground/5 p-6 sm:p-8 rounded-lg border border-primary/10 h-full flex items-center justify-center">
                <p className="text-foreground/60">Loading team details...</p>
            </div>
        );
    }

    if (!user?.details.teamId || team.length === 0) {
        return (
            <div className="bg-foreground/5 p-6 sm:p-8 rounded-lg border border-primary/10 h-full flex flex-col items-center justify-center text-center">
                 <h3 className="font-title text-3xl text-primary mb-4">No Team Found</h3>
                 <p className="text-foreground/60">You are not part of a team yet. Create or join a team to see your members here.</p>
            </div>
        );
    }

    return (
        <div className="bg-foreground/5 p-4 sm:p-6 rounded-lg border border-primary/10 h-full flex flex-col">
            <div className="text-center mb-6">
                <h3 className="font-title text-3xl text-primary text-center">{team[0]?.data.teamName}</h3>
                <p className="text-secondary text-sm">Team ID: {user.details.teamId}</p>
            </div>
            <div className="overflow-auto h-full" data-lenis-prevent>
                <table className="hidden md:!table w-full min-w-[700px] text-left">
                    <thead>
                        <tr className="border-b-2 border-primary/20 font-title text-primary uppercase tracking-wider text-center">
                            <th className="p-4 w-1/3">Name</th>
                            <th className="p-4 w-1/3">Antaragni ID</th>
                            <th className="p-4 w-1/3">Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {team.map((member) => (
                            <tr key={member.uid} className="border-b border-primary/10 last:border-b-0 text-center">
                                <td className="p-4 font-bold text-secondary align-middle w-1/3">{member.data.name}</td>
                                <td className="p-4 align-middle w-1/3">{member.data.id}</td>
                                <td className="p-4 align-middle w-1/3">{member.data.phone}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="md:!hidden space-y-3">
                    {team.map((member) => (
                        <div key={member.uid} className="bg-foreground/10 p-4 rounded-lg">
                            <p className="font-bold text-secondary">{member.data.name}</p>
                            <p className="text-sm text-foreground/80">ID: {member.data.id}</p>
                            <p className="text-sm text-foreground/60">{member.data.phone}</p>
                        </div>
                    ))}
                </div>
            </div>

            {user?.details?.isTeamLeader === "YES" && (
                <div className="mt-6 pt-6 border-t border-primary/10">
                    <h4 className="font-title text-xl text-primary mb-4">Add Team Member</h4>
                    <div className="flex flex-col sm:flex-row gap-4 items-end">
                        <div className="w-full sm:flex-1">
                            <Input
                                id="newMemberId"
                                placeholder="Enter member's Antaragni ID"
                                value={newMemberId}
                                onChange={(e) => setNewMemberId(e.target.value)}
                                disabled={isAdding}
                            />
                        </div>
                        <button 
                            className="btn-festival !px-8 h-10 whitespace-nowrap" 
                            onClick={handleAddMember}
                            disabled={isAdding || !newMemberId.trim()}
                        >
                            {isAdding ? "Adding..." : "Add Member"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
