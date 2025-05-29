"use client";

import {
  CirclePlus,
  FacebookIcon,
  Github,
  Instagram,
  Linkedin,
  Mail,
  Twitch,
  Twitter,
} from "lucide-react";
import React, { ReactNode, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface SocialMediaPlatform {
  id: string;
  name: string;
  icon: ReactNode;
}

interface PlatformCredentials {
  platform: string;
  email: string;
  password: string;
}

interface SelectSocmedProps {
  selectedPlatforms: string[];
  setSelectedPlatforms: React.Dispatch<React.SetStateAction<string[]>>;
  credentials: PlatformCredentials[];
  setCredentials: React.Dispatch<React.SetStateAction<PlatformCredentials[]>>;
}

const SOCIAL_MEDIA_PLATFORMS: SocialMediaPlatform[] = [
  { id: "facebook", name: "Facebook", icon: <FacebookIcon /> },
  { id: "twitter", name: "Twitter", icon: <Twitter /> },
  { id: "instagram", name: "Instagram", icon: <Instagram /> },
  { id: "linkedin", name: "LinkedIn", icon: <Linkedin /> },
  { id: "twitch", name: "Twitch", icon: <Twitch /> },
  { id: "github", name: "Github", icon: <Github /> },
  { id: "Email", name: "Email", icon: <Mail /> },
  { id: "other", name: "add more", icon: <CirclePlus /> },
];

export function SelectSocmed({
  selectedPlatforms,
  setSelectedPlatforms,
  credentials,
  setCredentials,
}: SelectSocmedProps) {
  const [isOtherDialogOpen, setIsOtherDialogOpen] = useState(false);
  const [otherPlatformName, setOtherPlatformName] = useState("");

  const handlePlatformToggle = (platformId: string) => {
    if (platformId === "other") {
      setIsOtherDialogOpen(true);
      return;
    }

    setSelectedPlatforms((prev: string[]) => {
      if (prev.includes(platformId)) {
        setCredentials((prevCreds: PlatformCredentials[]) =>
          prevCreds.filter(
            (cred: PlatformCredentials) => cred.platform !== platformId
          )
        );
        return prev.filter((id: string) => id !== platformId);
      } else {
        setCredentials((prevCreds: PlatformCredentials[]) => [
          ...prevCreds,
          { platform: platformId, email: "", password: "" },
        ]);
        return [...prev, platformId];
      }
    });
  };

  const handleCredentialChange = (
    platformId: string,
    field: "email" | "password",
    value: string
  ) => {
    setCredentials((prev: PlatformCredentials[]) =>
      prev.map((cred: PlatformCredentials) =>
        cred.platform === platformId ? { ...cred, [field]: value } : cred
      )
    );
  };

  const handleAddOtherPlatform = () => {
    if (otherPlatformName.trim()) {
      const newPlatformId = `other-${otherPlatformName
        .toLowerCase()
        .replace(/\s+/g, "-")}`;
      setSelectedPlatforms((prev) => [...prev, newPlatformId]);
      setCredentials((prev) => [
        ...prev,
        { platform: newPlatformId, email: "", password: "" },
      ]);
      setOtherPlatformName("");
      setIsOtherDialogOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
        {SOCIAL_MEDIA_PLATFORMS.map((platform) => (
          <button
            key={platform.id}
            onClick={() => handlePlatformToggle(platform.id)}
            className={`flex items-center space-x-2 rounded-lg border p-3 transition-colors ${
              selectedPlatforms.includes(platform.id)
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                : "border-zinc-200 hover:border-zinc-300 dark:border-zinc-700 dark:hover:border-zinc-600"
            }`}
          >
            <span className="text-xl">{platform.icon}</span>
            <span className="font-medium">{platform.name}</span>
          </button>
        ))}
      </div>

      {selectedPlatforms.length > 0 && (
        <div className="space-y-4 rounded-lg border border-zinc-200 p-4 dark:border-zinc-500">
          <h3 className="font-medium">Enter Credentials</h3>
          {selectedPlatforms.map((platformId) => {
            const platform = SOCIAL_MEDIA_PLATFORMS.find(
              (p) => p.id === platformId
            ) || {
              id: platformId,
              name: platformId.replace("other-", "").replace(/-/g, " "),
              icon: <Github />,
            };
            const credential = credentials.find(
              (c) => c.platform === platformId
            );

            return (
              <div key={platformId} className="space-y-2">
                <h4 className="font-medium">{platform.name}</h4>
                <div className="space-y-2 ">
                  <input
                    required
                    type="text"
                    placeholder="Email/Phone"
                    value={credential?.email || ""}
                    onChange={(e) =>
                      handleCredentialChange(
                        platformId,
                        "email",
                        e.target.value
                      )
                    }
                    className="w-full rounded-lg border border-zinc-200 px-3 py-2 dark:border-zinc-500 dark:bg-zinc-800"
                  />    
                  <input
                    required
                    type="text"
                    placeholder="Password"
                    value={credential?.password || ""}
                    onChange={(e) =>
                      handleCredentialChange(
                        platformId,
                        "password",
                        e.target.value
                      )
                    }
                    className="w-full rounded-lg border border-zinc-200 px-3 py-2 dark:border-zinc-500 dark:bg-zinc-800"
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Dialog open={isOtherDialogOpen} onOpenChange={setIsOtherDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Other Social Media Platform</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="platform-name" className="text-sm font-medium">
                Platform Name
              </label>
              <input
                id="platform-name"
                type="text"
                value={otherPlatformName}
                onChange={(e) => setOtherPlatformName(e.target.value)}
                placeholder="Enter platform name"
                className="w-full rounded-lg border border-zinc-200 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-800"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsOtherDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleAddOtherPlatform}>Add Platform</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
