import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Apple, Pizza, Salad, IceCream, Carrot, Cookie, ArrowDown } from "lucide-react";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { RollingNumber } from "./components/RollingNumber";
import { Particles } from "./components/Particles";

// Mock data for the visualizations
const happinessData = [
  { food: "Pizza", happiness: 95, health: 35 },
  { food: "Ice Cream", happiness: 90, health: 25 },
  { food: "Salad", happiness: 45, health: 95 },
  { food: "Burger", happiness: 88, health: 30 },
  { food: "Fruit", happiness: 70, health: 90 },
  { food: "Cookies", happiness: 85, health: 20 },
];

const weeklyConsumptionData = [
  { day: "Mon", comfortFood: 2, healthyFood: 5 },
  { day: "Tue", comfortFood: 3, healthyFood: 4 },
  { day: "Wed", comfortFood: 1, healthyFood: 6 },
  { day: "Thu", comfortFood: 4, healthyFood: 3 },
  { day: "Fri", comfortFood: 6, healthyFood: 2 },
  { day: "Sat", comfortFood: 5, healthyFood: 4 },
  { day: "Sun", comfortFood: 4, healthyFood: 5 },
];

const nutritionBalanceData = [
  { subject: "Energy", comfort: 85, healthy: 75 },
  { subject: "Mood", comfort: 90, healthy: 70 },
  { subject: "Longevity", comfort: 40, healthy: 95 },
  { subject: "Satisfaction", comfort: 95, healthy: 65 },
  { subject: "Vitality", comfort: 50, healthy: 90 },
];

const cravingDistribution = [
  { name: "Sweet", value: 35, color: "#FF8B94" },
  { name: "Salty", value: 28, color: "#FFE66D" },
  { name: "Fatty", value: 22, color: "#FF6B6B" },
  { name: "Healthy", value: 15, color: "#A8E6CF" },
];

const longTermData = [
  { year: "Year 1", comfortFocus: 85, healthFocus: 70 },
  { year: "Year 2", comfortFocus: 78, healthFocus: 75 },
  { year: "Year 3", comfortFocus: 70, healthFocus: 82 },
  { year: "Year 4", comfortFocus: 65, healthFocus: 88 },
  { year: "Year 5", comfortFocus: 60, healthFocus: 92 },
];

const COLORS = ["#FF6B6B", "#4ECDC4", "#FFE66D", "#A8E6CF", "#FF8B94"];

function Section({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay }}
    >
      {children}
    </motion.div>
  );
}

function GameSection() {
  const [balance, setBalance] = useState(50);
  const [items, setItems] = useState({
    comfort: [
      { id: "pizza", name: "Pizza", icon: Pizza, weight: -8 },
      { id: "icecream", name: "Ice Cream", icon: IceCream, weight: -7 },
      { id: "cookie", name: "Cookie", icon: Cookie, weight: -6 },
    ],
    healthy: [
      { id: "salad", name: "Salad", icon: Salad, weight: 7 },
      { id: "apple", name: "Apple", icon: Apple, weight: 6 },
      { id: "carrot", name: "Carrot", icon: Carrot, weight: 5 },
    ],
  });
  const [plateItems, setPlateItems] = useState<string[]>([]);

  const handleDrop = (itemId: string, weight: number) => {
    if (!plateItems.includes(itemId)) {
      setPlateItems([...plateItems, itemId]);
      setBalance(Math.max(0, Math.min(100, balance + weight)));
    }
  };

  const resetGame = () => {
    setPlateItems([]);
    setBalance(50);
  };

  return (
    <div className="max-w-6xl mx-auto text-center">
      <h2 className="text-6xl mb-6">Find Your Balance</h2>
      <p className="text-xl mb-12 text-muted-foreground max-w-2xl mx-auto">
        Drag foods onto the plate. Can you find the perfect balance between pleasure and health?
      </p>

      <div className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg">😔 Comfort</span>
          <span className="text-lg">Health 💪</span>
        </div>
        <div className="h-8 bg-gray-200 rounded-full overflow-hidden relative">
          <motion.div
            className="h-full bg-gradient-to-r from-[#FF6B6B] via-[#FFE66D] to-[#A8E6CF]"
            style={{ width: `${balance}%` }}
            animate={{ width: `${balance}%` }}
            transition={{ type: "spring", stiffness: 100 }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-1 h-10 bg-black/30 absolute"
              style={{ left: "50%" }}
            />
          </div>
        </div>
        <div className="text-center mt-2">
          <span className="text-sm text-muted-foreground">
            Balance: {balance > 55 ? "Too Healthy! 🥗" : balance < 45 ? "Too Indulgent! 🍕" : "Perfect! ✨"}
          </span>
        </div>
      </div>

      <Plate onDrop={handleDrop} plateItems={plateItems} allItems={[...items.comfort, ...items.healthy]} />

      <div className="grid grid-cols-2 gap-12 mt-12 max-w-4xl mx-auto">
        <div>
          <h3 className="text-2xl mb-6">Comfort Foods</h3>
          <div className="flex gap-4 flex-wrap justify-center">
            {items.comfort.map((item) => (
              <DraggableFood key={item.id} item={item} />
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-2xl mb-6">Healthy Foods</h3>
          <div className="flex gap-4 flex-wrap justify-center">
            {items.healthy.map((item) => (
              <DraggableFood key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={resetGame}
        className="mt-12 px-8 py-4 bg-accent text-accent-foreground rounded-full hover:scale-105 transition-transform"
      >
        Reset Plate
      </button>
    </div>
  );
}

function DraggableFood({ item }: { item: any }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "FOOD",
    item: { id: item.id, weight: item.weight },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const Icon = item.icon;

  return (
    <div
      ref={drag}
      className="w-20 h-20 bg-white rounded-2xl shadow-lg flex flex-col items-center justify-center cursor-move hover:scale-110 transition-transform border-2 border-border"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <Icon className="w-8 h-8 mb-1" />
      <span className="text-xs">{item.name}</span>
    </div>
  );
}

function Plate({ onDrop, plateItems, allItems }: { onDrop: (id: string, weight: number) => void; plateItems: string[]; allItems: any[] }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "FOOD",
    drop: (item: { id: string; weight: number }) => {
      onDrop(item.id, item.weight);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className="w-80 h-80 bg-white rounded-full shadow-2xl mx-auto border-8 border-[#FFE66D] flex items-center justify-center relative"
      style={{ backgroundColor: isOver ? "#fff9e6" : "#ffffff" }}
    >
      <div className="text-center">
        {plateItems.length === 0 ? (
          <p className="text-muted-foreground">Drop foods here</p>
        ) : (
          <div className="flex flex-wrap gap-2 justify-center max-w-xs">
            {plateItems.map((itemId) => {
              const item = allItems.find((i) => i.id === itemId);
              if (!item) return null;
              const Icon = item.icon;
              return (
                <div key={itemId} className="flex flex-col items-center">
                  <Icon className="w-10 h-10" />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const titleOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
  const titleScale = useTransform(scrollYProgress, [0, 0.08], [1, 0.8]);
  const questionOpacity = useTransform(scrollYProgress, [0.05, 0.15], [0, 1]);
  const questionY = useTransform(scrollYProgress, [0.05, 0.15], [100, 0]);
  const particleProgress = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-background">
        {/* Hero Section - Title */}
        <section className="h-screen flex flex-col items-center justify-center relative overflow-hidden px-8">
          <div className="absolute top-8 right-8 z-50">
            <p className="text-lg">Flavor <span className="text-accent">Explorers</span></p>
          </div>

          <Particles scrollProgress={particleProgress} />

          <motion.div
            style={{ opacity: titleOpacity, scale: titleScale }}
            className="relative z-10 text-center max-w-6xl"
          >
            <h1 className="text-[11rem] leading-[0.85] font-bold">
              The Comfort Food Paradox
            </h1>
          </motion.div>

          <motion.div
            style={{ opacity: questionOpacity, y: questionY }}
            className="absolute inset-0 flex items-center justify-center px-8 z-20"
          >
            <div className="text-center max-w-5xl">
              <h2 className="text-[8rem] leading-[0.9] mb-12 font-bold">
                Does <span className="text-accent italic">pleasure</span> come at the cost of health?
              </h2>
              <p className="text-xl max-w-2xl mx-auto mb-16 leading-relaxed">
                We map 62,000+ recipes across two hidden dimensions: biological pleasure versus healthiness.
              </p>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="inline-block"
              >
                <ArrowDown className="w-12 h-12" />
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Stats Bar */}
        <Section>
          <div className="w-full bg-primary text-primary-foreground py-12">
            <div className="max-w-7xl mx-auto px-8 flex justify-around items-center">
              <div className="text-center">
                <div className="text-6xl font-bold text-[#FFE66D] mb-2">
                  <RollingNumber value="62k+" />
                </div>
                <div className="text-lg">Recipes analyzed</div>
              </div>
              <div className="text-center">
                <div className="text-6xl font-bold text-[#FFE66D] mb-2">
                  <RollingNumber value="1530" />
                </div>
                <div className="text-lg">Ingredients</div>
              </div>
              <div className="text-center">
                <div className="text-6xl font-bold text-[#FFE66D] mb-2">
                  <RollingNumber value="∞" />
                </div>
                <div className="text-lg">Other stats...</div>
              </div>
            </div>
          </div>
        </Section>

        {/* Viz 1: The Trade-Off Myth */}
        <Section delay={0.1}>
          <div className="max-w-7xl mx-auto px-8 py-12">
            <div className="grid grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-7xl mb-8 leading-tight">The Trade-Off Myth</h2>
                <div className="space-y-4 text-lg leading-relaxed">
                  <p>
                    We've been told our whole lives that delicious food is bad for us.
                    The narrative is simple: if it tastes good, it must be unhealthy.
                  </p>
                  <p>
                    But when we plotted 62,000 recipes on a happiness-versus-health axis,
                    something unexpected emerged. The relationship isn't a straight line.
                    There are foods that score high on both dimensions.
                  </p>
                  <p className="text-muted-foreground italic">
                    Notice: Some healthy foods still score high on happiness.
                    The trade-off isn't as binary as we thought.
                  </p>
                </div>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-xl">
                <ResponsiveContainer width="100%" height={400}>
                  <ScatterChart margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                    <XAxis
                      type="number"
                      dataKey="health"
                      name="Health Score"
                      domain={[0, 100]}
                      label={{ value: "Health Score →", position: "bottom", offset: 0 }}
                    />
                    <YAxis
                      type="number"
                      dataKey="happiness"
                      name="Happiness"
                      domain={[0, 100]}
                      label={{ value: "← Happiness", angle: -90, position: "insideLeft" }}
                    />
                    <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                    <Scatter data={happinessData} fill="#FF6B6B">
                      {happinessData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </Section>

        {/* Viz 2: Weekly Patterns */}
        <Section delay={0.1}>
          <div className="max-w-7xl mx-auto px-8 py-12">
            <div className="grid grid-cols-2 gap-16 items-center">
              <div className="bg-white p-8 rounded-3xl shadow-xl">
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={weeklyConsumptionData} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                    <XAxis dataKey="day" />
                    <YAxis label={{ value: "Servings", angle: -90, position: "insideLeft" }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="comfortFood" name="Comfort Food" fill="#FF6B6B" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="healthyFood" name="Healthy Food" fill="#A8E6CF" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div>
                <h2 className="text-7xl mb-8 leading-tight">Your Weekly Reality</h2>
                <div className="space-y-4 text-lg leading-relaxed">
                  <p>
                    The pattern is clear: comfort food consumption spikes on Fridays and weekends,
                    right when stress levels peak and willpower fades.
                  </p>
                  <p>
                    Monday starts strong with salads and good intentions. By Thursday,
                    we're balanced. Then Friday hits, and suddenly pizza sounds like the only reasonable dinner choice.
                  </p>
                  <p className="text-muted-foreground italic">
                    This isn't weakness—it's human. The rhythm of comfort food mirrors
                    the rhythm of our lives.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Image Divider 2 */}
        <Section>
          <div className="w-full h-[45vh] relative overflow-hidden">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1734989175071-fedc119fb52e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000"
              alt="Fresh salad bowl"
              className="w-full h-full object-cover"
            />
          </div>
        </Section>

        {/* Viz 3: What We Crave */}
        <Section delay={0.1}>
          <div className="max-w-7xl mx-auto px-8 py-12">
            <div className="grid grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-7xl mb-8 leading-tight">What We Actually Crave</h2>
                <div className="space-y-4 text-lg leading-relaxed">
                  <p>
                    When we broke down cravings by category, the results were stark:
                    85% of what we want is sweet, salty, or fatty. Only 15% is genuinely healthy.
                  </p>
                  <p>
                    This isn't a personal failing. Our brains are wired for calorie-dense foods—an
                    evolutionary adaptation that made sense when food was scarce. Now it works against us.
                  </p>
                  <p className="text-muted-foreground italic">
                    The craving pie chart is biology, not character. The question isn't how to stop
                    craving comfort foods. It's how to work with that biology, not against it.
                  </p>
                </div>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-xl">
                <ResponsiveContainer width="100%" height={450}>
                  <PieChart>
                    <Pie
                      data={cravingDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={180}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {cravingDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </Section>

        {/* Image Divider 3 */}
        <Section>
          <div className="w-full h-[45vh] relative overflow-hidden">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1598619901847-97e8f143b744?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000"
              alt="Colorful ice cream"
              className="w-full h-full object-cover"
            />
          </div>
        </Section>

        {/* Viz 4: The Balance Radar */}
        <Section delay={0.1}>
          <div className="max-w-7xl mx-auto px-8 py-12">
            <div className="grid grid-cols-2 gap-16 items-center">
              <div className="bg-white p-8 rounded-3xl shadow-xl">
                <ResponsiveContainer width="100%" height={480}>
                  <RadarChart data={nutritionBalanceData} margin={{ top: 20, right: 60, left: 60, bottom: 20 }}>
                    <PolarGrid stroke="#ddd" />
                    <PolarAngleAxis dataKey="subject" />
                    <Radar name="Comfort Foods" dataKey="comfort" stroke="#FF6B6B" fill="#FF6B6B" fillOpacity={0.5} strokeWidth={2} />
                    <Radar name="Healthy Foods" dataKey="healthy" stroke="#A8E6CF" fill="#A8E6CF" fillOpacity={0.5} strokeWidth={2} />
                    <Legend />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div>
                <h2 className="text-7xl mb-8 leading-tight">The Balance Breakdown</h2>
                <div className="space-y-4 text-lg leading-relaxed">
                  <p>
                    Comfort foods dominate on mood and satisfaction. They're engineered for pleasure,
                    designed to hit every pleasure receptor in your brain at once.
                  </p>
                  <p>
                    But healthy foods win on longevity, vitality, and sustained energy.
                    They don't spike you; they stabilize you. The payoff is slower but deeper.
                  </p>
                  <p className="text-muted-foreground italic">
                    Each diet excels in different dimensions. The insight? You don't have to choose.
                    Combine them. Let comfort foods fuel your mood, and let healthy foods fuel your life.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Image Divider 4 */}
        <Section>
          <div className="w-full h-[45vh] relative overflow-hidden">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1756363937942-e9a323f0efeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000"
              alt="Fresh colorful fruit"
              className="w-full h-full object-cover"
            />
          </div>
        </Section>

        {/* Viz 5: Long-term Wellbeing */}
        <Section delay={0.1}>
          <div className="max-w-7xl mx-auto px-8 py-12">
            <div className="grid grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-7xl mb-8 leading-tight">The Long Game</h2>
                <div className="space-y-4 text-lg leading-relaxed">
                  <p>
                    Over five years, the trajectories diverge. Comfort-focused eating feels good now,
                    but the wellbeing score drops steadily. Energy fades. Health markers decline.
                  </p>
                  <p>
                    Health-focused eating, on the other hand, compounds. Year one feels restrictive.
                    Year three feels normal. Year five feels powerful. The body adapts, and the payoff accelerates.
                  </p>
                  <p className="text-muted-foreground italic">
                    Time is the ultimate advantage. The choice you make today echoes years down the line.
                    Health-focused eating isn't about deprivation—it's about investment.
                  </p>
                </div>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-xl">
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={longTermData} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                    <XAxis dataKey="year" />
                    <YAxis label={{ value: "Wellbeing Score", angle: -90, position: "insideLeft" }} domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="comfortFocus"
                      name="Comfort-Focused"
                      stroke="#FF6B6B"
                      strokeWidth={3}
                      dot={{ r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="healthFocus"
                      name="Health-Focused"
                      stroke="#A8E6CF"
                      strokeWidth={3}
                      dot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </Section>

        {/* Image Divider 5 */}
        <Section>
          <div className="w-full h-[45vh] relative overflow-hidden">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1671106571674-a89083d27e60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000"
              alt="Burger food photography"
              className="w-full h-full object-cover"
            />
          </div>
        </Section>

        {/* Game Section */}
        <Section delay={0.1}>
          <div className="w-full bg-[#FFE66D]/20 py-16">
            <GameSection />
          </div>
        </Section>

        {/* Conclusion */}
        <Section delay={0.1}>
          <div className="max-w-4xl mx-auto text-center px-8 py-16">
            <h2 className="text-8xl mb-8 leading-tight">The Answer?</h2>
            <p className="text-3xl mb-8">
              Pleasure doesn't cost health. <span className="text-accent italic">Imbalance</span> does.
            </p>
            <p className="text-xl text-muted-foreground leading-relaxed">
              The comfort food paradox isn't about choosing one over the other.
              It's about finding the rhythm that works for you—where pizza on Friday
              fuels your soul, and salad on Monday fuels your body. The data doesn't lie:
              balance wins. Always.
            </p>
          </div>
        </Section>
      </div>
    </DndProvider>
  );
}
