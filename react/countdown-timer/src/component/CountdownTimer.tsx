import { useEffect, useRef, useState } from "react";

type TimeField = "hour" | "minute" | "second";

type Time = {
  hour: number | "";
  minute: number | "";
  second: number | "";
};

const INITIAL_TIME: Time = {
  hour: "",
  minute: "",
  second: "",
};

export default function CountDownTimer() {
  const [time, setTime] = useState<Time>(INITIAL_TIME);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: TimeField,
  ) => {
    const value = e.target.value === "" ? "" : Number(e.target.value);

    setTime((prevTime) => {
      const copyTime: Time = {
        ...prevTime,
        [field]: value,
      };

      const seconds =
        (typeof copyTime.second === "number" ? copyTime.second : 0) +
        (typeof copyTime.minute === "number" ? copyTime.minute * 60 : 0) +
        (typeof copyTime.hour === "number" ? copyTime.hour * 3600 : 0);

      return {
        hour: Math.floor(seconds / 3600),
        minute: Math.floor((seconds % 3600) / 60),
        second: seconds % 60,
      };
    });
  };

  const handleStart = () => {
    const totalSeconds =
      (typeof time.hour === "number" ? time.hour : 0) * 3600 +
      (typeof time.minute === "number" ? time.minute : 0) * 60 +
      (typeof time.second === "number" ? time.second : 0);

    if (totalSeconds === 0) {
      return;
    }

    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setIsRunning(false);
    setTime(INITIAL_TIME);
  };

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    intervalRef.current = setInterval(() => {
      setTime((prevTime) => {
        const totalSeconds =
          (typeof prevTime.hour === "number" ? prevTime.hour : 0) * 3600 +
          (typeof prevTime.minute === "number" ? prevTime.minute : 0) * 60 +
          (typeof prevTime.second === "number" ? prevTime.second : 0);

        if (totalSeconds <= 1) {
          if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }

          setIsRunning(false);

          return INITIAL_TIME;
        }

        const remainingSeconds = totalSeconds - 1;

        return {
          hour: Math.floor(remainingSeconds / 3600),
          minute: Math.floor((remainingSeconds % 3600) / 60),
          second: remainingSeconds % 60,
        };
      });
    }, 1000);

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning]);

  return (
    <div className="container">
      <div className="input-container">
        <input
          disabled={isRunning}
          value={time.hour}
          onChange={(e) => handleChange(e, "hour")}
          type="number"
          min={0}
          placeholder="HH"
        />
        :
        <input
          disabled={isRunning}
          value={time.minute}
          onChange={(e) => handleChange(e, "minute")}
          type="number"
          min={0}
          placeholder="MM"
        />
        :
        <input
          disabled={isRunning}
          value={time.second}
          onChange={(e) => handleChange(e, "second")}
          type="number"
          min={0}
          placeholder="SS"
        />
      </div>

      <div className="btn-container">
        <button onClick={handleStart}>{isRunning ? "Pause" : "Start"}</button>

        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}
