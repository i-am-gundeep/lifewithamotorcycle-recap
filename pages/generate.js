"use client";
import { useState } from "react";
import {
  Box,
  Input,
  VStack,
  Heading,
  Text,
  Button,
  FormControl,
  FormLabel,
  Flex,
  Image
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function Generate() {
  const YEAR = new Date().getFullYear();
  const router = useRouter();

  const [stats, setStats] = useState({});
  const [image, setImage] = useState(null);

  const handleChange = (e) =>
    setStats({ ...stats, [e.target.name]: e.target.value });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const downloadPoster = () => {
    const id = Math.random().toString(36).substring(2, 8);
    sessionStorage.setItem(
      id,
      JSON.stringify({ ...stats, image })
    );
    router.push(`/recap/${id}`);
  };

  return (
    <Box minH="100vh" bg="#141414" color="white" p={6}>
      <Heading textAlign="center" mb={6} fontSize={{ base: "2xl", md: "3xl" }}>
        MY RIDING RECAP {YEAR}
      </Heading>

      <Flex
        direction={{ base: "column", md: "row" }}
        gap={8}
        maxW="1200px"
        mx="auto"
      >
        {/* Inputs */}
        <VStack spacing={4} flex="1">
          {/* My Fav Memory */}
          <FormControl>
            <FormLabel fontSize="sm" color="gray.400">
              My Favourite Memory this Year 📷
            </FormLabel>
            <Input type="file" accept="image/*" onChange={handleImageUpload} bg="#1A1A1A" border="1px solid #222" />
          </FormControl>

          {/* My IG Handle */}
          <FormControl>
            <FormLabel fontSize="sm" color="gray.400">
              My IG 📸
            </FormLabel>
            <Input name="handle" onChange={handleChange} bg="#1A1A1A" border="1px solid #222" />
          </FormControl>

          {/* This year I rode */}
          <FormControl>
            <FormLabel fontSize="sm" color="gray.400">
              This year I rode 🛣️
            </FormLabel>
            <Input name="km" onChange={handleChange} bg="#1A1A1A" border="1px solid #222" />
          </FormControl>

          {/* Completed rides */}
          <FormControl>
            <FormLabel fontSize="sm" color="gray.400">
              Number of Rides I Completed this Year  🧭
            </FormLabel>
            <Input name="trips" onChange={handleChange} bg="#1A1A1A" border="1px solid #222" />
          </FormControl>

          {/* Fastest */}
          <FormControl>
            <FormLabel fontSize="sm" color="gray.400">
              Fastest I rode this year 💨
            </FormLabel>
            <Input name="speed" onChange={handleChange} bg="#1A1A1A" border="1px solid #222" />
          </FormControl>

          {/* Longest run in a day */}
          <FormControl>
            <FormLabel fontSize="sm" color="gray.400">
              Longest I rode in One Day 🏔️
            </FormLabel>
            <Input name="longest" onChange={handleChange} bg="#1A1A1A" border="1px solid #222" />
          </FormControl>

          {/* Police meetups / Challans */}
          <FormControl>
            <FormLabel fontSize="sm" color="gray.400">
              Police Meetups / Challans this Year 🚓
            </FormLabel>
            <Input name="challans" onChange={handleChange} bg="#1A1A1A" border="1px solid #222" />
          </FormControl>

          {/* Total I spent this year */}
          <FormControl>
            <FormLabel fontSize="sm" color="gray.400">
              Total I spent this year 💸
            </FormLabel>
            <Input name="money" onChange={handleChange} bg="#1A1A1A" border="1px solid #222" />
          </FormControl>

          <Button
            colorScheme="orange"
            size="lg"
            w="100%"
            onClick={downloadPoster}
          >
            Download Poster
          </Button>
        </VStack>

        {/* Live Preview */}
        <Box flex="1" display="flex" justifyContent="center">
          <PosterPreview stats={stats} image={image} YEAR={YEAR} />
        </Box>
      </Flex>
    </Box>
  );
}

function PosterPreview({ stats, image, YEAR }) {
  return (
    <Box
      w={{ base: "280px", md: "320px" }}
      h={{ base: "520px", md: "600px" }}
      bg="#141414"
      borderRadius="2xl"
      border="1px solid #222"
      p={4}
      textAlign="center"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      {/* Header */}
      <Box>
        <Text fontSize="xs" color="orange.400" letterSpacing="widest">
          MY RIDING RECAP {YEAR}
        </Text>
      </Box>

      {/* Polaroid Photo */}
      <Box
        bg="white"
        p={2}
        borderRadius="md"
        boxShadow="lg"
        mx="auto"
        w="85%"
      >
        {image && (
          <Image
            src={image}
            alt="Trip"
            objectFit="cover"
            w="100%"
            h="160px"
          />
        )}
        <Text mt={2} fontSize="xs" color="gray.700" fontWeight="bold">
          {stats.handle ? `@${stats.handle}` : "@yourhandle"}
        </Text>
      </Box>

      {/* Stats */}
      <VStack spacing={1}>
        {stats.km && <Stat label="🛣️ This year I rode" value={stats.km + " km"} />}
        {stats.trips && <Stat label="🧭 Completed rides" value={stats.trips} />}
        {stats.speed && <Stat label="💨 Fastest" value={stats.speed + " km/h"} />}
        {stats.longest && <Stat label="🏔️ Longest run in a day" value={stats.longest + " km"} />}
        {stats.challans && <Stat label="🚓 Police meetups / Challans" value={stats.challans} />}
        {stats.money && <Stat label="💸 Total I spent this year" value={`₹${stats.money}`} />}
      </VStack>

      {/* Footer */}
      <Text fontSize="xs" color="gray.500">
        made with ❤️
      </Text>
    </Box>
  );
}

function Stat({ label, value }) {
  return (
    <Box>
      <Text fontSize="10px" color="gray.400" letterSpacing="widest">
        {label}
      </Text>
      <Text fontSize="lg" fontWeight="bold">
        {value}
      </Text>
    </Box>
  );
}
