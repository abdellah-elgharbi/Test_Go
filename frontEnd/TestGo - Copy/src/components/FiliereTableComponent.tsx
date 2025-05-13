import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FiliereData {
  id: string;
  module: string;
  number: string;
  name: string;
  membresModule: number;
  date: string;
  isActive: boolean;
}

const FiliereTableComponent: React.FC = () => {
  const [filiereData, setFiliereData] = useState<FiliereData[]>([
    { id: '022/2018', module: '07', number: '2016', name: '', membresModule: 3, date: '03-17-2018', isActive: true },
    { id: '014/2018', module: '43', number: '', name: '', membresModule: 7, date: '11-16-2018', isActive: true },
    { id: '010/2018', module: '30', number: 'me3', name: '', membresModule: 4, date: '05-07-2018', isActive: true },
    { id: '011/2018', module: '30', number: 'me3', name: '', membresModule: 4, date: '03-10-2018', isActive: true },
    { id: '020/2017', module: '20', number: '', name: '', membresModule: 2, date: '05-27-2018', isActive: true },
    { id: '115/2017', module: '30', number: 'GO', name: '', membresModule: 12, date: '05-11-2018', isActive: true },
    { id: '114/2017', module: '41', number: 'AQUA', name: '', membresModule: 7, date: '04-01-2018', isActive: true },
    { id: '113/2017', module: '60', number: 'JT', name: '', membresModule: 1, date: '03-25-2018', isActive: true },
    { id: '112/2017', module: '50', number: 'TEST', name: '', membresModule: 6, date: '09-05-2018', isActive: true },
    { id: '120/2017', module: '01', number: 'GEEE', name: '', membresModule: 1, date: '06-26-2018', isActive: true }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    module: '',
    number: '',
    name: '',
    isActive: true
  });
  const [selectedItem, setSelectedItem] = useState<FiliereData | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const rowsPerPage = 10;
  const totalRows = 40; // Total count for demonstration
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  // Toggle active status
  const toggleActive = (id: string) => {
    setFiliereData(data => 
      data.map(item => 
        item.id === id ? { ...item, isActive: !item.isActive } : item
      )
    );
  };

  // Filter data based on search term
  const filteredData = filiereData.filter(item => 
    item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.module.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle switch changes
  const handleSwitchChange = (checked: boolean) => {
    setFormData({
      ...formData,
      isActive: checked
    });
  };

  // Handle select changes
  const handleSelectChange = (value: string) => {
    setFormData({
      ...formData,
      module: value
    });
  };

  // Create new filiere
  const handleCreate = () => {
    const newItem: FiliereData = {
      id: `${Math.floor(Math.random() * 999).toString().padStart(3, '0')}/${new Date().getFullYear()}`,
      module: formData.module,
      number: formData.number,
      name: formData.name,
      membresModule: 0,
      date: new Date().toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
      }).replace(/(\d+)\/(\d+)\/(\d+)/, '$1-$2-$3'),
      isActive: formData.isActive
    };

    setFiliereData([newItem, ...filiereData]);
    setIsCreateModalOpen(false);
    setFormData({ module: '', number: '', name: '', isActive: true });
  };

  // Edit existing filiere
  const handleEdit = () => {
    if (!selectedItem) return;

    setFiliereData(data => 
      data.map(item => 
        item.id === selectedItem.id 
          ? { 
              ...item, 
              module: formData.module, 
              number: formData.number, 
              name: formData.name, 
              isActive: formData.isActive 
            } 
          : item
      )
    );
    
    setIsEditModalOpen(false);
    setSelectedItem(null);
  };

  // Delete filiere
  const handleDelete = () => {
    if (!selectedItem) return;
    
    setFiliereData(data => data.filter(item => item.id !== selectedItem.id));
    setIsDeleteModalOpen(false);
    setSelectedItem(null);
  };

  // Open edit modal with selected item data
  const openEditModal = (item: FiliereData) => {
    setSelectedItem(item);
    setFormData({
      module: item.module,
      number: item.number,
      name: item.name,
      isActive: item.isActive
    });
    setIsEditModalOpen(true);
  };

  // Open delete confirmation modal
  const openDeleteModal = (item: FiliereData) => {
    setSelectedItem(item);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="p-4 max-w-full">
      <div className="text-lg font-medium mb-4">groupe de filière</div>
      
      <div className="flex justify-between mb-4">
        <Button 
          className="bg-blue-800 text-white hover:bg-blue-900"
          onClick={() => {
            setFormData({ module: '', number: '', name: '', isActive: true });
            setIsCreateModalOpen(true);
          }}
        >
          + Créer
        </Button>
        
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            className="pl-8 pr-4 py-2 rounded-md border border-gray-300" 
            placeholder="Search" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="py-2">GDF</TableHead>
              <TableHead className="py-2">Module</TableHead>
              <TableHead className="py-2">Numéro</TableHead>
              <TableHead className="py-2">Nom</TableHead>
              <TableHead className="py-2">Membres Module</TableHead>
              <TableHead className="py-2">Date</TableHead>
              <TableHead className="py-2">Active</TableHead>
              <TableHead className="py-2">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((item) => (
              <TableRow key={item.id} className="border-t border-gray-200">
                <TableCell className="py-2 text-blue-600">{item.id}</TableCell>
                <TableCell className="py-2">{item.module}</TableCell>
                <TableCell className="py-2 text-blue-600">{item.number}</TableCell>
                <TableCell className="py-2">{item.name}</TableCell>
                <TableCell className="py-2">{item.membresModule}</TableCell>
                <TableCell className="py-2">{item.date}</TableCell>
                <TableCell className="py-2">
                  <Switch
                    checked={item.isActive}
                    onCheckedChange={() => toggleActive(item.id)}
                    className={`${item.isActive ? 'bg-blue-900' : 'bg-blue-200'}`}
                  />
                </TableCell>
                <TableCell className="py-2">
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-blue-600 border-blue-600"
                      onClick={() => openEditModal(item)}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-red-600 border-red-600"
                      onClick={() => openDeleteModal(item)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="flex justify-between items-center mt-4 text-sm">
        <div className="text-gray-500">{filteredData.length} of {totalRows} rows</div>
        
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) setCurrentPage(currentPage - 1);
                }}
              />
            </PaginationItem>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = i + 1;
              return (
                <PaginationItem key={pageNum}>
                  <PaginationLink 
                    href="#" 
                    isActive={pageNum === currentPage}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(pageNum);
                    }}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            
            {totalPages > 5 && <PaginationItem><PaginationEllipsis /></PaginationItem>}
            
            <PaginationItem>
              <PaginationNext 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      {/* Create Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Créer Nouveau Filière</DialogTitle>
            <DialogDescription>
              Ajoutez les détails pour créer un nouveau groupe de filière.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="module" className="text-right">
                Module
              </Label>
              <div className="col-span-3">
                <Select onValueChange={handleSelectChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sélectionnez un module" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="01">01</SelectItem>
                    <SelectItem value="07">07</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="30">30</SelectItem>
                    <SelectItem value="41">41</SelectItem>
                    <SelectItem value="43">43</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="60">60</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="number" className="text-right">
                Numéro
              </Label>
              <Input
                id="number"
                name="number"
                value={formData.number}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nom
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="active" className="text-right">
                Active
              </Label>
              <div className="col-span-3">
                <Switch
                  id="active"
                  checked={formData.isActive}
                  onCheckedChange={handleSwitchChange}
                  className={`${formData.isActive ? 'bg-blue-900' : 'bg-blue-200'}`}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Annuler</Button>
            </DialogClose>
            <Button type="submit" onClick={handleCreate} className="bg-blue-800 text-white hover:bg-blue-900">
              Créer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Modifier Filière</DialogTitle>
            <DialogDescription>
              Modifiez les détails du groupe de filière.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="moduleEdit" className="text-right">
                Module
              </Label>
              <div className="col-span-3">
                <Select defaultValue={formData.module} onValueChange={handleSelectChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={formData.module || "Sélectionnez un module"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="01">01</SelectItem>
                    <SelectItem value="07">07</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="30">30</SelectItem>
                    <SelectItem value="41">41</SelectItem>
                    <SelectItem value="43">43</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="60">60</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="numberEdit" className="text-right">
                Numéro
              </Label>
              <Input
                id="numberEdit"
                name="number"
                value={formData.number}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nameEdit" className="text-right">
                Nom
              </Label>
              <Input
                id="nameEdit"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="activeEdit" className="text-right">
                Active
              </Label>
              <div className="col-span-3">
                <Switch
                  id="activeEdit"
                  checked={formData.isActive}
                  onCheckedChange={handleSwitchChange}
                  className={`${formData.isActive ? 'bg-blue-900' : 'bg-blue-200'}`}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Annuler</Button>
            </DialogClose>
            <Button type="submit" onClick={handleEdit} className="bg-blue-800 text-white hover:bg-blue-900">
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer ce groupe de filière?<br />
              {selectedItem && <span className="font-medium">{selectedItem.id} {selectedItem.number}</span>}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Annuler</Button>
            </DialogClose>
            <Button type="submit" onClick={handleDelete} className="bg-red-600 text-white hover:bg-red-700">
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FiliereTableComponent;