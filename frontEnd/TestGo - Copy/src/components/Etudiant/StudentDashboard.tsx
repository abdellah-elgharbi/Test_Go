import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Calendar, Clock, BookOpen, Award, AlertCircle, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function StudentDashboard() {
  // State variables for data that will come from API
  const [studentInfo, setStudentInfo] = useState(null);
  const [upcomingTests, setUpcomingTests] = useState([]);
  const [pastTests, setPastTests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [performanceData, setPerformanceData] = useState([]);

  // Mock data for development purposes (will be replaced by API calls)
  const mockStudentInfo = {
    name: "EL MASKYNE Mohamed Amine",
    email: "MohamedAmine.ELMASKYNE@gmail.com",
    studentId: "BA25110",
    group: "2ITE Group A"
  };

  const mockUpcomingTests = [
    {
      id: "1",
      title: "Java Fundamentals",
      module: "Java Programming",
      type: "theoretical",
      difficulty: "easy",
      duration: 45,
      questionsCount: 20,
      available: true,
      startTime: "May 10, 2023 - 10:00 AM",
    },
    {
      id: "2",
      title: "OOP Concepts",
      module: "Java Programming",
      type: "hybrid",
      difficulty: "medium",
      duration: 60,
      questionsCount: 15,
      available: false,
      startTime: "May 15, 2023 - 2:00 PM",
    },
    {
      id: "3",
      title: "MongoDB Basics",
      module: "Database Systems",
      type: "practical",
      difficulty: "hard",
      duration: 90,
      questionsCount: 10,
      available: false,
      startTime: "May 20, 2023 - 9:00 AM",
    },
  ];

  const mockPastTests = [
    {
      id: "101",
      title: "Introduction to Java",
      module: "Java Programming",
      date: "2023-04-01",
      score: 85,
      totalQuestions: 20,
      correct: 17,
      timeSpent: 38,
      duration: 45
    },
    {
      id: "102",
      title: "Variables and Data Types",
      module: "Java Programming",
      date: "2023-04-08",
      score: 90,
      totalQuestions: 15,
      correct: 13.5,
      timeSpent: 42,
      duration: 60
    },
    {
      id: "103",
      title: "Control Structures",
      module: "Java Programming",
      date: "2023-04-15",
      score: 75,
      totalQuestions: 20,
      correct: 15,
      timeSpent: 50,
      duration: 60
    },
  ];

  const mockPerformanceData = [
    { name: 'Jan', score: 65 },
    { name: 'Feb', score: 75 },
    { name: 'Mar', score: 78 },
    { name: 'Apr', score: 83 },
  ];

  // Simulating API calls with useEffect
  useEffect(() => {
    // In real implementation, these would be actual API calls
    setStudentInfo(mockStudentInfo);
    setUpcomingTests(mockUpcomingTests);
    setPastTests(mockPastTests);
    setPerformanceData(mockPerformanceData);
    setIsLoading(false);
  }, []);

  //statistics
  const totalTests = pastTests.length;
  const avgScore = Math.round(pastTests.reduce((acc, test) => acc + test.score, 0) / totalTests || 0);
  const totalQuestions = pastTests.reduce((acc, test) => acc + test.totalQuestions, 0);
  const totalCorrect = pastTests.reduce((acc, test) => acc + test.correct, 0);
  const avgAccuracy = Math.round((totalCorrect / totalQuestions) * 100 || 0);

  //available test
  const nextTest = upcomingTests.find(test => test.available);

  //badge color based on difficulty
  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  //status badge for upcoming tests
  const getTestStatusBadge = (test) => {
    if (test.available) {
      return <Badge className="bg-green-500">Available Now</Badge>;
    }

    const testDate = new Date(test.startTime.split(" - ")[0]);
    const today = new Date();
    const diffTime = testDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 2) {
      return <Badge className="bg-amber-500">Coming Soon</Badge>;
    }

    return <Badge variant="outline">Scheduled</Badge>;
  };

  // formatting dates
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading dashboard...</div>;
  }

  if (error) {
    return (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Failed to load dashboard data. Please try again later.</AlertDescription>
        </Alert>
    );
  }

  return (
      <div className="space-y-8 p-6 max-w-7xl mx-auto">
        {/* Header with Student Info */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Student Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back{studentInfo ? `, ${studentInfo.name}` : ''}! View your upcoming tests and past results.
            </p>
          </div>

          {studentInfo && (
              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${studentInfo.name}`} alt={studentInfo.name} />
                  <AvatarFallback>{studentInfo.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{studentInfo.name}</p>
                  <p className="text-xs text-muted-foreground">{studentInfo.group}</p>
                </div>
              </div>
          )}
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tests Taken</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalTests}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Over the past 3 months
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgScore}%</div>
              <Progress value={avgScore} className="h-2 mt-2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tests Pending</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{upcomingTests.length}</div>
              {nextTest && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Next: {nextTest.title.length > 15 ? nextTest.title.substring(0, 15) + '...' : nextTest.title}
                  </p>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Accuracy</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgAccuracy}%</div>
              <Progress value={avgAccuracy} className="h-2 mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Performance Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Trend</CardTitle>
            <CardDescription>Your test scores over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Next Available Test Alert - Only show if there's an available test */}
        {nextTest && (
            <Alert className="bg-blue-50 border-blue-200">
              <AlertTitle className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                Test Available Now
              </AlertTitle>
              <AlertDescription className="mt-2">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <div>
                    <p className="font-medium">{nextTest.title}</p>
                    <p className="text-sm text-muted-foreground">{nextTest.module} • {nextTest.duration} minutes • {nextTest.questionsCount} questions</p>
                  </div>
                  <Button asChild className="mt-2 sm:mt-0">
                    <Link to={`/test/${nextTest.id}`}>Start Test</Link>
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
        )}

        {/* Tabs for Upcoming and Past Tests */}
        <Tabs defaultValue="upcoming" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="upcoming">Upcoming Tests</TabsTrigger>
            <TabsTrigger value="past">Past Tests</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {upcomingTests.length === 0 ? (
                <Card>
                  <CardContent className="pt-6 text-center">
                    <p>No upcoming tests scheduled.</p>
                  </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {upcomingTests.map((test) => (
                      <Card key={test.id} className="overflow-hidden">
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-lg">{test.title}</CardTitle>
                              <CardDescription>{test.module}</CardDescription>
                            </div>
                            <Badge className={getDifficultyColor(test.difficulty)}>
                              {test.difficulty}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-3">
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4" />
                            <span>{test.duration} minutes</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm mt-1">
                            <BookOpen className="h-4 w-4" />
                            <span>{test.questionsCount} questions</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm mt-1">
                            <Badge variant="outline" className="font-normal">
                              {test.type.charAt(0).toUpperCase() + test.type.slice(1)}
                            </Badge>
                          </div>
                          <div className="mt-3 text-sm">
                            <p className="font-medium text-xs text-muted-foreground">Available at:</p>
                            <p>{test.startTime}</p>
                          </div>
                        </CardContent>
                        <CardFooter className="bg-gray-50 pt-3 pb-3 flex justify-between">
                          {getTestStatusBadge(test)}
                          {test.available ? (
                              <Button asChild size="sm">
                                <Link to={`/test/${test.id}`}>Start Test</Link>
                              </Button>
                          ) : (
                              <Button disabled size="sm">Not Available</Button>
                          )}
                        </CardFooter>
                      </Card>
                  ))}
                </div>
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Test History</CardTitle>
                <CardDescription>
                  View your past test results and performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                {pastTests.length === 0 ? (
                    <p className="text-center py-4">No test history available yet.</p>
                ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Test Name</TableHead>
                            <TableHead>Module</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Score</TableHead>
                            <TableHead>Time Used</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {pastTests.map(test => (
                              <TableRow key={test.id}>
                                <TableCell className="font-medium">{test.title}</TableCell>
                                <TableCell>{test.module}</TableCell>
                                <TableCell>{formatDate(test.date)}</TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                              <span className={`font-medium ${test.score >= 80 ? 'text-green-600' : test.score >= 60 ? 'text-amber-600' : 'text-red-600'}`}>
                                {test.score}%
                              </span>
                                    <Badge variant="outline" className={`${test.score >= 80 ? 'border-green-200 bg-green-50 text-green-700' : test.score >= 60 ? 'border-amber-200 bg-amber-50 text-amber-700' : 'border-red-200 bg-red-50 text-red-700'}`}>
                                      {test.correct}/{test.totalQuestions}
                                    </Badge>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center space-x-2">
                                    <Progress value={(test.timeSpent / test.duration) * 100} className="h-2 w-[80px]" />
                                    <span className="text-sm text-muted-foreground">
                                {test.timeSpent}/{test.duration} min
                              </span>
                                  </div>
                                </TableCell>
                                <TableCell className="text-right">
                                  <Button variant="link" asChild className="h-auto p-0">
                                    <Link to={`/test/${test.id}/results`} className="text-blue-600 hover:text-blue-800">
                                      View Results
                                    </Link>
                                  </Button>
                                </TableCell>
                              </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
  );
}