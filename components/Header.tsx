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
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";

const Header = () => {
  return (
    <header className="w-full p-4 flex items-center justify-between bg-light">
      <div className="text-lg font-bold">InfoChronicle</div>
      <nav>
        <ul className="flex items-center gap-4">
          <li>
            <Dialog>
              <DialogTrigger asChild>
                <button className="flex items-center">
                  <Settings strokeWidth={1} size={18} className="mr-1" />{" "}
                  Preferences
                </button>
              </DialogTrigger>
              <DialogContent>
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
                  <form className="space-y-5">
                    <div>
                      <Label className="block mb-2 text-base font-medium">
                        Category
                      </Label>
                      <div className="px-2 grid grid-cols-3 gap-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="business" />
                          <label
                            htmlFor="business"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Business
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="entertainment" />
                          <label
                            htmlFor="entertainment"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Entertainment
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="health" />
                          <label
                            htmlFor="health"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Health
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="science" />
                          <label
                            htmlFor="science"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Science
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="sports" />
                          <label
                            htmlFor="sports"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Sports
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="technology" />
                          <label
                            htmlFor="technology"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Technology
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="general" />
                          <label
                            htmlFor="general"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            General
                          </label>
                        </div>
                      </div>
                    </div>
                    <Button type="submit" className="w-full">
                      Save
                    </Button>
                  </form>
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
