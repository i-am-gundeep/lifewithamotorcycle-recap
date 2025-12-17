import { useEffect, useState } from "react";
import {
  Box,
  VStack,
  Heading,
  Text,
  Button
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import html2canvas from "html2canvas";

const YEAR = new Date().getFullYear();

export default function Recap() {
  const router = useRouter();
  const { id } = router.query;
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (id) {
      const data = sessionStorage.getItem(id);
      if (data) setStats(JSON.parse(data));
    }
  }, [id]);

  const exportImage = async () => {
    const node = document.getElementById("story");
    const canvas = await html2canvas(node, {
      scale: 3,
      backgroundColor: "#000"
    });

    const url = canvas.toDataURL("image/png");

    if (navigator.share) {
      const blob = await (await fetch(url)).blob();
      const file = new File([blob], "moto-recap.png", { type: "image/png" });
      navigator.share({ files: [file] });
    } else {
      const link = document.createElement("a");
      link.download = "moto-recap.png";
      link.href = url;
      link.click();
    }
  };

  if (!stats) return null;

  return (
    <Box minH="100vh" bg="#000" color="white" py={10}>
      <VStack spacing={6}>

        {/* STORY */}
        <Box
          id="story"
          w="360px"
          h="640px"
          bg="radial-gradient(circle at top, #151515, #000)"
          border="1px solid #222"
          borderRadius="2xl"
          p={6}
          textAlign="center"
          position="relative"
        >
          <Text fontSize="xs" color="orange.400" letterSpacing="widest">
            {YEAR} RIDING RECAP
          </Text>

          <Heading fontSize="lg">@lifewithamotorcycle</Heading>
          <Text fontSize="sm" color="gray.400">
            {stats.bike}
          </Text>

          <VStack spacing={3} mt={8}>
            <Stat label="TOTAL KM" value={stats.km} />
            <Stat label="TRIPS" value={stats.trips} />
            <Stat label="TOP SPEED" value={stats.speed} suffix=" km/h" />
            <Stat label="LONGEST RIDE" value={stats.longest} suffix=" km" />
            <Stat label="SPENT" value={stats.money} prefix="₹" />
          </VStack>

          <Box position="absolute" bottom={6} left={0} right={0}>
            <Text fontSize="xs" color="gray.500">
              life with a motorcycle
            </Text>
          </Box>
        </Box>

        <Button colorScheme="orange" size="lg" onClick={exportImage}>
          Share / Download
        </Button>

      </VStack>
    </Box>
  );
}

function Stat({ label, value, prefix = "", suffix = "" }) {
  if (!value) return null;
  return (
    <Box>
      <Text fontSize="xs" color="gray.400" letterSpacing="widest">
        {label}
      </Text>
      <Text fontSize="2xl" fontWeight="bold">
        {prefix}{value}{suffix}
      </Text>
    </Box>
  );
}
