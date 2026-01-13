import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Pause, RotateCcw, Download } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import videoPart1 from "@/assets/video-logisconnect-part1.mp4";
import videoPart2 from "@/assets/video-logisconnect-part2.mp4";
import videoPart3 from "@/assets/video-logisconnect-part3.mp4";

const VideoPage = () => {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const videos = [videoPart1, videoPart2, videoPart3];

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleEnded = () => {
    if (currentVideo < videos.length - 1) {
      setCurrentVideo(currentVideo + 1);
    } else {
      setIsPlaying(false);
    }
  };

  const handleRestart = () => {
    setCurrentVideo(0);
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Découvrez LogisConnect
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            La solution IA qui révolutionne la gestion des réclamations locatives pour les bailleurs sociaux
          </p>
        </div>

        <Card className="max-w-4xl mx-auto overflow-hidden">
          <CardContent className="p-0">
            <div className="relative aspect-video bg-black">
              <video
                ref={videoRef}
                key={currentVideo}
                src={videos[currentVideo]}
                className="w-full h-full object-contain"
                onEnded={handleEnded}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                autoPlay={currentVideo > 0}
              />
              
              {!isPlaying && currentVideo === 0 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <Button
                    size="lg"
                    onClick={handlePlay}
                    className="rounded-full h-20 w-20"
                  >
                    <Play className="h-10 w-10 ml-1" />
                  </Button>
                </div>
              )}
            </div>
            
            <div className="p-4 flex items-center justify-center gap-4 bg-muted/50">
              {isPlaying ? (
                <Button variant="outline" onClick={handlePause}>
                  <Pause className="h-4 w-4 mr-2" /> Pause
                </Button>
              ) : (
                <Button onClick={handlePlay}>
                  <Play className="h-4 w-4 mr-2" /> Lecture
                </Button>
              )}
              <Button variant="outline" onClick={handleRestart}>
                <RotateCcw className="h-4 w-4 mr-2" /> Recommencer
              </Button>
              <span className="text-sm text-muted-foreground">
                Partie {currentVideo + 1} / {videos.length}
              </span>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-6">
            Prêt à transformer la gestion de vos réclamations ?
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild size="lg">
              <Link to="/demo">Demander une démo</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/tarifs">Voir les tarifs</Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default VideoPage;
