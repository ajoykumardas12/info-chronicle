"use client";
import { Settings } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useState } from "react";
import addData from "@/firebase/addData";
import { useAuthContext } from "@/context/AuthContext";
import {
  Preferences,
  usePreferencesContext,
} from "@/context/PreferencesContext";

const Header = () => {
  // Controlled dialog
  const [isOpen, setIsOpen] = useState(false);

  const { uid } = useAuthContext() as { uid: string };
  // Get preferences from context
  const { preferences, setPreferences } = usePreferencesContext() as {
    preferences: Preferences;
    setPreferences: (newData: Preferences) => void;
  };

  const [category, setCategory] = useState(
    preferences?.category ? preferences.category : "general"
  );
  const [saving, setSaving] = useState(false);
  const [result, setResult] = useState<string | null>();

  const handleSavePreference = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setResult(null);
    const data = {
      category: category,
    };
    const { result, error } = await addData("preferences", uid, data);

    if (error) {
      console.log(error);
      setResult("Something went wrong! Please try again.");
    } else {
      setResult("Preferences updated!");
      setSaving(false);
      setPreferences(data);
      setIsOpen(false);
    }
  };

  return (
    <header className="w-full p-4 flex items-center justify-between bg-light">
      <div className="text-lg font-bold">InfoChronicle</div>
      <nav>
        <ul className="flex items-center gap-6">
          <li>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <button
                  className="flex items-center"
                  onClick={() => setIsOpen(true)}
                >
                  <Settings strokeWidth={1} size={18} className="mr-1" />{" "}
                  Preferences
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-xs sm:max-w-sm md:max-w-lg">
                <DialogHeader>
                  <DialogTitle className="text-xl">
                    Set your preferences
                  </DialogTitle>
                  <DialogDescription>
                    Set your news preference here. Click save when you&apos;re
                    done.
                  </DialogDescription>
                </DialogHeader>
                <div>
                  <form
                    className="m-2 space-y-7"
                    onSubmit={handleSavePreference}
                  >
                    <div className="grid gap-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={category}
                        onValueChange={(value) => setCategory(value)}
                      >
                        <SelectTrigger className="">
                          <SelectValue placeholder="Select a fruit" />
                        </SelectTrigger>
                        <SelectContent id="category">
                          <SelectGroup>
                            <SelectItem value="general">General</SelectItem>
                            <SelectItem value="business">Business</SelectItem>
                            <SelectItem value="entertainment">
                              Entertainment
                            </SelectItem>
                            <SelectItem value="health">Health</SelectItem>
                            <SelectItem value="science">Science</SelectItem>
                            <SelectItem value="sports">Sports</SelectItem>
                            <SelectItem value="technology">
                              Technology
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button type="submit" className="w-full" disabled={saving}>
                      {saving ? "Saving" : "Save"}
                    </Button>
                  </form>
                  <div className="text-center">{result}</div>
                </div>
              </DialogContent>
            </Dialog>
          </li>
          <li>Log Out</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
