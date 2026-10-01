import { useNavigate } from "react-router-dom";
import { modules } from "@/components/learn/ModuleData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle, Play } from "lucide-react";
import { motion } from "motion/react";
import { useProgress } from "@/stores/progress";

export default function LearnHub() {
  const navigate = useNavigate();
  const { completedModules } = useProgress();
  
  return (
    <div className="container max-w-5xl mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight mb-4">Learning Path</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Master the open-source workflow step-by-step. Start here if you've never contributed before.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
        {modules.map((mod, index) => {
          const isCompleted = completedModules.includes(mod.id);
          const isNext = index === completedModules.length; // The next module to take
          const isLocked = index > completedModules.length;

          return (
            <motion.div
              key={mod.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card 
                className={`h-full flex flex-col transition-all duration-300 ${isNext ? 'border-primary shadow-md ring-1 ring-primary/20 scale-[1.02]' : isLocked ? 'opacity-60 grayscale-[0.5]' : 'hover:border-primary/50 cursor-pointer'}`}
                onClick={() => !isLocked && navigate(`/learn/${mod.id}`)}
              >
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-mono font-bold text-primary bg-primary/10 px-2 py-1 rounded">
                      Module {mod.id}
                    </span>
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : isNext ? (
                      <Circle className="w-5 h-5 text-primary fill-primary/20 animate-pulse" />
                    ) : (
                      <Circle className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                  <CardTitle className="text-xl">{mod.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {mod.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-auto pt-4">
                  <Button 
                    variant={isNext ? "default" : isCompleted ? "outline" : "secondary"} 
                    className="w-full gap-2"
                    disabled={isLocked}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/learn/${mod.id}`);
                    }}
                  >
                    {isCompleted ? "Review Module" : isNext ? <><Play className="w-4 h-4 fill-current"/> Start Module</> : "Locked"}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
