import * as React from "react";
import { View, Platform } from "react-native";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { Calendar } from "lucide-react-native";
import  DateTimePicker from '@react-native-community/datetimepicker';

interface DatePickerProps {
  date: Date | undefined;
  onChange: (date: Date | undefined) => void;
  label: string;
}

export function DatePicker({ date, onChange, label }: DatePickerProps) {
  const isWeb = Platform.OS === 'web';
  const [showPicker, setShowPicker] = React.useState(false);

  const handleChange = (event: any, selectedDate?: Date) => {
    setShowPicker(false);
    onChange(selectedDate);
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return "Select date";
    return date.toLocaleDateString(undefined, {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isWeb) {
    return (
      <View className="flex flex-row items-center gap-2">
        <Text className="absolute ml-4">{label}:</Text>
        <input
          type="date"
          value={date ? date.toISOString().split('T')[0] : ''}
          onChange={(e) => onChange(e.target.value ? new Date(e.target.value) : undefined)}
          className="bg-[#261B18] text-white rounded-3xl px-4 py-2 w-40 pl-24"
          placeholder="Select date"
        />
      </View>
    );
  }

  return (
    <View className="flex flex-row items-center gap-2">
      <Button
        variant="outline"
        className="bg-[#261B18] rounded-3xl flex-row items-center gap-2"
        onPress={() => setShowPicker(true)}
      >
        <Calendar className="w-5 h-5" />
        <Text>{label}: {formatDate(date)}</Text>
      </Button>
      {showPicker && date && (
        <DateTimePicker
          value={date}
          mode="date"
          onChange={handleChange}
        />
      )}
    </View>
  );
} 
