"use client";
import React, { useState, useMemo } from "react";
import { Check } from "lucide-react";

// Types
interface SeatConfig {
  id: string;
  number: string;
  status: "available" | "selected" | "booked" | "blocked";
  tier: "regular" | "premium" | "vip";
  price: number;
}

interface RowConfig {
  rowId: string;
  rowLabel: string;
  seats: SeatConfig[];
  leftGap?: number; // Empty spaces on left
  rightGap?: number; // Empty spaces on right
  centerGap?: number; // Gap in middle (aisle)
  centerGapAfter?: number; // After which seat number to add center gap
}

interface CinemaConfig {
  name: string;
  rows: RowConfig[];
  pricing: {
    regular: number;
    premium: number;
    vip: number;
  };
  maxSeatsPerBooking: number;
}

// Sample cinema configurations
const cinemaConfigs: Record<string, CinemaConfig> = {
  multiplex: {
    name: "Multiplex Cinema",
    rows: [
      {
        rowId: "A",
        rowLabel: "A",
        seats: Array.from({ length: 8 }, (_, i) => ({
          id: `A-${i + 1}`,
          number: `${i + 1}`,
          status: i === 3 ? "booked" : "available",
          tier: "vip",
          price: 350,
        })),
        leftGap: 2,
        rightGap: 2,
        centerGap: 2,
        centerGapAfter: 4,
      },
      {
        rowId: "B",
        rowLabel: "B",
        seats: Array.from({ length: 10 }, (_, i) => ({
          id: `B-${i + 1}`,
          number: `${i + 1}`,
          status: i === 2 || i === 7 ? "booked" : "available",
          tier: "premium",
          price: 250,
        })),
        leftGap: 1,
        rightGap: 1,
        centerGap: 2,
        centerGapAfter: 5,
      },
      {
        rowId: "C",
        rowLabel: "C",
        seats: Array.from({ length: 12 }, (_, i) => ({
          id: `C-${i + 1}`,
          number: `${i + 1}`,
          status: "available",
          tier: "regular",
          price: 150,
        })),
        centerGap: 2,
        centerGapAfter: 6,
      },
      {
        rowId: "D",
        rowLabel: "D",
        seats: Array.from({ length: 10 }, (_, i) => ({
          id: `D-${i + 1}`,
          number: `${i + 1}`,
          status: i === 1 ? "booked" : "available",
          tier: "regular",
          price: 150,
        })),
        leftGap: 1,
        rightGap: 1,
        centerGap: 2,
        centerGapAfter: 5,
      },
    ],
    pricing: { regular: 150, premium: 250, vip: 350 },
    maxSeatsPerBooking: 6,
  },

  imax: {
    name: "IMAX Theater",
    rows: [
      {
        rowId: "VIP1",
        rowLabel: "VIP",
        seats: Array.from({ length: 6 }, (_, i) => ({
          id: `VIP1-${i + 1}`,
          number: `${i + 1}`,
          status: "available",
          tier: "vip",
          price: 500,
        })),
        leftGap: 3,
        rightGap: 3,
        centerGap: 3,
        centerGapAfter: 3,
      },
      {
        rowId: "P1",
        rowLabel: "P",
        seats: Array.from({ length: 14 }, (_, i) => ({
          id: `P1-${i + 1}`,
          number: `${i + 1}`,
          status: "available",
          tier: "premium",
          price: 300,
        })),
        centerGap: 2,
        centerGapAfter: 7,
      },
      {
        rowId: "R1",
        rowLabel: "R",
        seats: Array.from({ length: 16 }, (_, i) => ({
          id: `R1-${i + 1}`,
          number: `${i + 1}`,
          status: Math.random() > 0.8 ? "booked" : "available",
          tier: "regular",
          price: 200,
        })),
        centerGap: 2,
        centerGapAfter: 8,
      },
    ],
    pricing: { regular: 200, premium: 300, vip: 500 },
    maxSeatsPerBooking: 4,
  },
};

// Seat Component
const Seat: React.FC<{
  seat: SeatConfig;
  onToggle: (seatId: string) => void;
  isSelectable: boolean;
}> = ({ seat, onToggle, isSelectable }) => {
  const seatStyles = {
    available: {
      regular: "bg-blue-100 border-blue-300 hover:bg-blue-200 text-blue-800",
      premium:
        "bg-purple-100 border-purple-300 hover:bg-purple-200 text-purple-800",
      vip: "bg-yellow-100 border-yellow-400 hover:bg-yellow-200 text-yellow-800",
    },
    selected: {
      regular:
        "bg-green-500 border-green-400 text-white shadow-lg shadow-green-500/30",
      premium:
        "bg-green-500 border-green-400 text-white shadow-lg shadow-green-500/30",
      vip: "bg-green-500 border-green-400 text-white shadow-lg shadow-green-500/30",
    },
    booked: {
      regular: "bg-red-200 border-red-300 text-red-600 cursor-not-allowed",
      premium: "bg-red-200 border-red-300 text-red-600 cursor-not-allowed",
      vip: "bg-red-200 border-red-300 text-red-600 cursor-not-allowed",
    },
    blocked: {
      regular: "bg-gray-200 border-gray-300 cursor-not-allowed",
      premium: "bg-gray-200 border-gray-300 cursor-not-allowed",
      vip: "bg-gray-200 border-gray-300 cursor-not-allowed",
    },
  };

  const canClick = seat.status === "available" || seat.status === "selected";
  const isSelected = seat.status === "selected";

  return (
    <button
      className={`
        relative w-8 h-8 sm:w-10 sm:h-10 rounded-t-lg border-2 
        transition-all duration-200 font-medium text-xs
        ${seatStyles[seat.status][seat.tier]}
        ${canClick ? "hover:scale-105 active:scale-95" : ""}
        ${
          !isSelectable && seat.status === "available"
            ? "opacity-50 cursor-not-allowed"
            : ""
        }
      `}
      disabled={!canClick || (!isSelectable && seat.status === "available")}
      onClick={() => canClick && onToggle(seat.id)}
      title={`${seat.tier.toUpperCase()} - ₹${seat.price} - ${seat.status}`}
    >
      {isSelected ? (
        <Check className="w-3 h-3 sm:w-4 sm:h-4 mx-auto" />
      ) : (
        seat.number
      )}
    </button>
  );
};

// Row Component
const SeatRow: React.FC<{
  row: RowConfig;
  selectedSeats: Set<string>;
  onSeatToggle: (seatId: string) => void;
  maxSeatsReached: boolean;
}> = ({ row, selectedSeats, onSeatToggle, maxSeatsReached }) => {
  const renderSeats = () => {
    const elements = [];

    // Left gaps
    for (let i = 0; i < (row.leftGap || 0); i++) {
      elements.push(
        <div key={`left-gap-${i}`} className="w-8 h-8 sm:w-10 sm:h-10" />
      );
    }

    // Seats with center gap
    row.seats.forEach((seat, index) => {
      // Add center gap after specified seat
      if (row.centerGap && row.centerGapAfter && index === row.centerGapAfter) {
        for (let i = 0; i < row.centerGap; i++) {
          elements.push(
            <div
              key={`center-gap-${index}-${i}`}
              className="w-8 h-8 sm:w-10 sm:h-10"
            />
          );
        }
      }

      const isSelected = selectedSeats.has(seat.id);
      const updatedSeat = {
        ...seat,
        status: isSelected ? "selected" : seat.status,
      } as SeatConfig;
      const isSelectable = !maxSeatsReached || isSelected;

      elements.push(
        <Seat
          key={seat.id}
          seat={updatedSeat}
          onToggle={onSeatToggle}
          isSelectable={isSelectable}
        />
      );
    });

    // Right gaps
    for (let i = 0; i < (row.rightGap || 0); i++) {
      elements.push(
        <div key={`right-gap-${i}`} className="w-8 h-8 sm:w-10 sm:h-10" />
      );
    }

    return elements;
  };

  return (
    <div className="flex items-center gap-2 mb-2">
      <div className="w-8 text-center font-bold text-gray-600 text-sm">
        {row.rowLabel}
      </div>
      <div className="flex gap-1">{renderSeats()}</div>
    </div>
  );
};

// Legend Component
const Legend: React.FC<{ pricing: CinemaConfig["pricing"] }> = ({
  pricing,
}) => (
  <div className="flex flex-wrap gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
    <div className="flex items-center gap-2">
      <div className="w-4 h-4 bg-blue-100 border border-blue-300 rounded-t-sm"></div>
      <span className="text-sm">Regular (₹{pricing.regular})</span>
    </div>
    <div className="flex items-center gap-2">
      <div className="w-4 h-4 bg-purple-100 border border-purple-300 rounded-t-sm"></div>
      <span className="text-sm">Premium (₹{pricing.premium})</span>
    </div>
    <div className="flex items-center gap-2">
      <div className="w-4 h-4 bg-yellow-100 border border-yellow-400 rounded-t-sm"></div>
      <span className="text-sm">VIP (₹{pricing.vip})</span>
    </div>
    <div className="flex items-center gap-2">
      <div className="w-4 h-4 bg-green-500 rounded-t-sm"></div>
      <span className="text-sm">Selected</span>
    </div>
    <div className="flex items-center gap-2">
      <div className="w-4 h-4 bg-red-200 border border-red-300 rounded-t-sm"></div>
      <span className="text-sm">Booked</span>
    </div>
  </div>
);

// Main Component
const CinemaSeatPicker: React.FC = () => {
  const [selectedCinema, setSelectedCinema] = useState<string>("multiplex");
  const [selectedSeats, setSelectedSeats] = useState<Set<string>>(new Set());

  const config = cinemaConfigs[selectedCinema];

  const { totalPrice, selectedSeatDetails } = useMemo(() => {
    const details: SeatConfig[] = [];
    let price = 0;

    config.rows.forEach((row) => {
      row.seats.forEach((seat) => {
        if (selectedSeats.has(seat.id)) {
          details.push(seat);
          price += seat.price;
        }
      });
    });

    return { totalPrice: price, selectedSeatDetails: details };
  }, [selectedSeats, config]);

  const maxSeatsReached = selectedSeats.size >= config.maxSeatsPerBooking;

  const handleSeatToggle = (seatId: string) => {
    setSelectedSeats((prev) => {
      const newSelection = new Set(prev);
      if (newSelection.has(seatId)) {
        newSelection.delete(seatId);
      } else if (newSelection.size < config.maxSeatsPerBooking) {
        newSelection.add(seatId);
      }
      return newSelection;
    });
  };

  const resetSelection = () => setSelectedSeats(new Set());

  return (
    <div className="max-w-6xl mx-auto p-4 bg-white">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">Cinema Hall Booking</h1>

        {/* Cinema Selector */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Select Cinema:
          </label>
          <select
            className="px-3 py-2 border border-gray-300 rounded-md"
            value={selectedCinema}
            onChange={(e) => {
              setSelectedCinema(e.target.value);
              resetSelection();
            }}
          >
            {Object.entries(cinemaConfigs).map(([key, config]) => (
              <option key={key} value={key}>
                {config.name}
              </option>
            ))}
          </select>
        </div>

        <Legend pricing={config.pricing} />
      </div>

      {/* Screen */}
      <div className="mb-8">
        <div className="text-center">
          <div className="inline-block bg-gray-200 px-8 py-2 rounded-t-3xl text-sm font-medium text-gray-600 mb-4">
            SCREEN
          </div>
        </div>
      </div>

      {/* Seat Grid */}
      <div className="mb-8 flex justify-center">
        <div className="inline-block">
          {config.rows.map((row) => (
            <SeatRow
              key={row.rowId}
              row={row}
              selectedSeats={selectedSeats}
              onSeatToggle={handleSeatToggle}
              maxSeatsReached={maxSeatsReached}
            />
          ))}
        </div>
      </div>

      {/* Booking Summary */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">Booking Summary</h3>

        {selectedSeatDetails.length === 0 ? (
          <p className="text-gray-500">No seats selected</p>
        ) : (
          <>
            <div className="mb-3">
              <p className="text-sm text-gray-600 mb-1">
                Selected Seats ({selectedSeats.size}/{config.maxSeatsPerBooking}
                ):
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedSeatDetails.map((seat) => (
                  <span
                    key={seat.id}
                    className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm"
                  >
                    {seat.id} (₹{seat.price})
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-gray-200">
              <span className="font-semibold">Total: ₹{totalPrice}</span>
              <div className="space-x-2">
                <button
                  onClick={resetSelection}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
                >
                  Reset
                </button>
                <button
                  className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={() =>
                    alert(
                      `Booking ${selectedSeats.size} seats for ₹${totalPrice}`
                    )
                  }
                >
                  Book Seats
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CinemaSeatPicker;
