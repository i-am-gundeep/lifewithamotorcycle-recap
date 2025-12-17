import { useEffect, useState } from "react";
import { Box, VStack, Text, Button, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";
import html2canvas from "html2canvas";

export default function Recap() {
  const router = useRouter();
  const { id } = router.query;
  const YEAR = new Date().getFullYear();

  const [data, setData] = useState(null);

  useEffect(() => {
    if (!id) return;

    const saved = sessionStorage.getItem(id);
    if (saved) {
      setData(JSON.parse(saved));
    }
  }, [id]);

  const downloadPoster = async () => {
    const element = document.getElementById("poster");
    if (!element) return;

    const canvas = await html2canvas(element, {
      scale: 3,
      backgroundColor: "#F3F2EE"
    });

    const link = document.createElement("a");
    link.download = "my_riding_recap_2025.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  if (!data) return null;

  return (
    <Box minH="100vh" bg="#F3F2EE" color="#111" py={10}>
      <VStack spacing={6}>
        {/* POSTER */}
        <Box
          id="poster"
          w="360px"
          h="640px" // 9:16
          bg="#F3F2EE"
          border="1px solid #DDD"
          borderRadius="2xl"
          p={4}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          textAlign="center"
        >
          {/* HEADER */}
          <Text fontSize="xs" letterSpacing="widest" color="orange.500">
            MY RIDING RECAP {YEAR}
          </Text>

          {/* POLAROID */}
          <Box
            bg="#FAFAFA"
            p={2}
            borderRadius="md"
            w="85%"
            mx="auto"
            transform="rotate(-0.2deg)"
            boxShadow="
              0 10px 25px rgba(0,0,0,0.25),
              0 4px 10px rgba(0,0,0,0.15)
            "
          >
            {data.image && (
              <Image
                src={data.image}
                alt="memory"
                w="100%"
                h="200px"
                objectFit="cover"
              />
            )}

            <Text mt={2} fontSize="sm" fontWeight="bold" color="gray.700">
              @{data.handle || "yourhandle"}
            </Text>
          </Box>

          {/* STATS */}
          <VStack spacing={1}>
            {data.km && stat("🛣️ This year I rode", `${data.km} km`)}
            {data.trips && stat("🧭 Completed rides", data.trips)}
            {data.speed && stat("💨 Fastest", `${data.speed} km/h`)}
            {data.longest && stat("🏔️ Longest run in a day", `${data.longest} km`)}
            {data.challans && stat("🚓 Police meetups", data.challans)}
            {data.money && stat("💸 Total I spent", `₹${data.money}`)}
          </VStack>

          {/* FOOTER */}
          <Text fontSize="xs" color="gray.500">
            made with ❤️
          </Text>
        </Box>

        {/* DOWNLOAD */}
        <Button colorScheme="orange" size="lg" onClick={downloadPoster}>
          Download Poster
        </Button>
      </VStack>
    </Box>
  );
}

function stat(label, value) {
  return (
    <Box>
      <Text fontSize="10px" letterSpacing="widest" color="gray.600">
        {label}
      </Text>
      <Text fontSize="lg" fontWeight="bold">
        {value}
      </Text>
    </Box>
  );
}
