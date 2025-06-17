
import React from 'react';
import { 
  User, 
  Trophy, 
  BookOpen, 
  Settings, 
  Crown, 
  Star,
  TrendingUp,
  Gamepad2,
  Youtube,
  Play,
  Moon,
  Sun
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { useTheme } from 'next-themes';
import { Link } from 'react-router-dom';

const GameSidebar = () => {
  const { theme, setTheme } = useTheme();

  const tutorials = [
    {
      title: "Getting Started with FinLife",
      videoId: "dQw4w9WgXcQ",
      views: "1.2M views"
    },
    {
      title: "Investment Strategies for Beginners",
      videoId: "dQw4w9WgXcQ", 
      views: "850K views"
    },
    {
      title: "Building Your Emergency Fund",
      videoId: "dQw4w9WgXcQ",
      views: "650K views"
    },
    {
      title: "Advanced Financial Planning",
      videoId: "dQw4w9WgXcQ",
      views: "420K views"
    }
  ];

  const achievements = [
    { name: "First Job", icon: "💼", unlocked: true },
    { name: "Emergency Fund", icon: "🛡️", unlocked: true },
    { name: "Investment Pro", icon: "📈", unlocked: false },
    { name: "Debt Free", icon: "✨", unlocked: false },
    { name: "Millionaire", icon: "💎", unlocked: false },
  ];

  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader className="p-4">
        {/* User Profile */}
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-4 text-white dark:from-blue-600 dark:to-purple-700">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold">Alex Johnson</h3>
              <p className="text-blue-100 text-sm">Level 12 Player</p>
            </div>
            <Crown className="w-5 h-5 text-yellow-300 ml-auto" />
          </div>
          <div className="flex justify-between text-sm">
            <div>
              <p className="text-blue-100">Lives Played</p>
              <p className="font-bold">23</p>
            </div>
            <div>
              <p className="text-blue-100">Best Score</p>
              <p className="font-bold">$2.4M</p>
            </div>
            <div>
              <p className="text-blue-100">Streak</p>
              <p className="font-bold">7 days</p>
            </div>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Quick Stats */}
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Quick Stats
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="px-2 space-y-2">
              <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-green-700 dark:text-green-300">Today's Progress</span>
                  <span className="text-green-600 dark:text-green-400 font-bold">+5 Years</span>
                </div>
              </div>
              <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-700 dark:text-blue-300">Financial IQ</span>
                  <span className="text-blue-600 dark:text-blue-400 font-bold">Level 8</span>
                </div>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Achievements */}
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2">
            <Trophy className="w-4 h-4" />
            Achievements
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="px-2 space-y-2">
              {achievements.slice(0, 3).map((achievement, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 p-2 rounded-lg ${
                    achievement.unlocked 
                      ? 'bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800' 
                      : 'bg-muted border border-border opacity-60'
                  }`}
                >
                  <span className="text-lg">{achievement.icon}</span>
                  <span className={`text-sm font-medium ${
                    achievement.unlocked ? 'text-yellow-700 dark:text-yellow-300' : 'text-muted-foreground'
                  }`}>
                    {achievement.name}
                  </span>
                  {achievement.unlocked && (
                    <Star className="w-3 h-3 text-yellow-500 dark:text-yellow-400 ml-auto" />
                  )}
                </div>
              ))}
              <button className="w-full text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 py-1">
                View all achievements →
              </button>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Tutorials */}
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Tutorials
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="px-2 space-y-3">
              {tutorials.map((tutorial, index) => (
                <div key={index} className="group cursor-pointer">
                  <div className="bg-card border border-border rounded-lg p-3 hover:border-red-300 dark:hover:border-red-700 hover:shadow-sm transition-all">
                    <div className="flex items-start gap-3">
                      <div className="relative w-16 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded flex items-center justify-center flex-shrink-0">
                        <Youtube className="w-6 h-6 text-white" />
                        <div className="absolute inset-0 bg-black/20 rounded flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Play className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-medium text-foreground leading-tight line-clamp-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                          {tutorial.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">{tutorial.views}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <button className="w-full text-xs text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 py-1 flex items-center justify-center gap-1">
                <Youtube className="w-3 h-3" />
                More tutorials →
              </button>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>Life Story</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/minigames" className="flex items-center gap-2">
                    <Gamepad2 className="w-4 h-4" />
                    <span>Minigames</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="flex items-center gap-2">
                  <Trophy className="w-4 h-4" />
                  <span>Leaderboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  className="flex items-center gap-2"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                >
                  {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default GameSidebar;
