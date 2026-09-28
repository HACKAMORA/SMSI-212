"use client";

import {
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";
import { DOMAINS } from "@/lib/domains";
import type { DomainId } from "@/lib/types";

export function RadarMaturity({
  current,
  previous,
}: {
  current: Record<DomainId, number | null>;
  previous?: Record<DomainId, number | null> | null;
}) {
  const data = DOMAINS.map((d) => ({
    domain: d.short,
    actuel: current[d.id] ?? 0,
    reference: previous ? (previous[d.id] ?? 0) : undefined,
  }));

  return (
    <div className="h-[280px] w-full">
      <ResponsiveContainer>
        <RadarChart data={data} cx="50%" cy="50%" outerRadius="72%">
          <PolarGrid stroke="#E7E5DC" />
          <PolarAngleAxis dataKey="domain" tick={{ fill: "#6F6E68", fontSize: 12 }} />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fill: "#9C9B94", fontSize: 10 }}
            tickCount={5}
          />
          {previous && (
            <Radar
              name="Référence"
              dataKey="reference"
              stroke="#9C9B94"
              fill="#9C9B94"
              fillOpacity={0.12}
            />
          )}
          <Radar
            name="Actuel"
            dataKey="actuel"
            stroke="#4F46E5"
            fill="#4F46E5"
            fillOpacity={0.18}
          />
          <Legend wrapperStyle={{ color: "#6F6E68" }} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
