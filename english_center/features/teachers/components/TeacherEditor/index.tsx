import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

import { Teacher } from '../../types';

type Props = {
  teacher?: Partial<Teacher>;
  onCancel: () => void;
  onSave: (teacher: Omit<Teacher, 'id'>, id?: string) => void;
};

const TeacherEditor = ({ teacher, onCancel, onSave }: Props) => {
  const [edit, setEdit] = useState<Partial<Teacher>>(teacher || {});
  const [date, setDate] = useState<Date | undefined>(
    teacher?.birthdate ? new Date(teacher?.birthdate) : new Date()
  );

  const handleAddTeacher = () => {
    if (!edit?.name || !edit?.email || !edit.gender || !date) {
      toast({
        title: 'Error',
        description: 'Name, email, birthdate, and gender are required',
        variant: 'destructive',
      });
      return;
    }
    const teacherUpdate: Omit<Teacher, 'id'> = {
      name: edit.name,
      email: edit.email,
      gender: edit.gender,
      birthdate: date.getTime(),
      address: edit.address || '',
      phone: edit.phone || '',
    };
    onSave(teacherUpdate, teacher?.id);
  };
  return (
    <Dialog
      open={true}
      onOpenChange={(open) => {
        if (!open) {
          onCancel();
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {teacher?.id ? 'Edit Teacher' : 'Add Teacher'}
          </DialogTitle>
          <DialogDescription>
            Enter the details of the teacher here.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
              <span className="text-red-600">*</span>
            </Label>
            <Input
              id="name"
              value={edit.name}
              onChange={(e) => setEdit({ ...edit, name: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">
              Birth Date
              <span className="text-red-600">*</span>
            </Label>
            <div className="col-span-3">
              <Input
                className="col-span-3"
                type="date"
                value={date?.toISOString().split('T')[0]}
                onChange={(e) => {
                  setDate(new Date(e.target.value));
                }}
              />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="course" className="text-right">
              Gender
              <span className="text-red-600">*</span>
            </Label>
            <Select
              value={edit.gender}
              onValueChange={(value) => setEdit({ ...edit, gender: value })}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male" key="male">
                  Male
                </SelectItem>
                <SelectItem value="female" key="female">
                  Female
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
              <span className="text-red-600">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={edit.email}
              onChange={(e) => setEdit({ ...edit, email: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              Phone
            </Label>
            <Input
              id="phone"
              value={edit.phone}
              onChange={(e) => setEdit({ ...edit, phone: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address" className="text-right">
              Address
            </Label>
            <Textarea
              id="address"
              value={edit.address}
              onChange={(e) => setEdit({ ...edit, address: e.target.value })}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleAddTeacher}>
            {teacher?.id ? 'Update Teacher' : 'Add Teacher'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TeacherEditor;
