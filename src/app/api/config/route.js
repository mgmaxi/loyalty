import { NextResponse } from "next/server";
import { DEFAULT_CONFIG } from "@/data/config";

// GET: Returns the current config
export async function GET() {
  try {
    return NextResponse.json(DEFAULT_CONFIG, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch config" },
      { status: 500 }
    );
  }
}

// POST: Receives updated config and validates it
export async function POST(request) {
  try {
    const body = await request.json();

    // Validate that required fields exist
    if (!body.niveles || !body.reglasCPPG || !body.beneficiosPorNivel) {
      return NextResponse.json(
        {
          error: "Invalid config: missing required fields (niveles, reglasCPPG, beneficiosPorNivel)",
        },
        { status: 400 }
      );
    }

    // Validate niveles structure (should have levels 1-4)
    if (
      !body.niveles[1] ||
      !body.niveles[2] ||
      !body.niveles[3] ||
      !body.niveles[4]
    ) {
      return NextResponse.json(
        { error: "Invalid config: must contain all 4 levels (1-4)" },
        { status: 400 }
      );
    }

    // Validate beneficiosPorNivel structure
    if (
      !body.beneficiosPorNivel[1] ||
      !body.beneficiosPorNivel[2] ||
      !body.beneficiosPorNivel[3] ||
      !body.beneficiosPorNivel[4]
    ) {
      return NextResponse.json(
        {
          error: "Invalid config: beneficiosPorNivel must contain all 4 levels",
        },
        { status: 400 }
      );
    }

    // In a real app, you would save this to a database or file
    // For now, just validate and return success
    console.log("Config updated:", body);

    return NextResponse.json(
      {
        success: true,
        message: "Config updated successfully",
        config: body,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Config error:", error);
    return NextResponse.json(
      { error: "Failed to process config update" },
      { status: 500 }
    );
  }
}
