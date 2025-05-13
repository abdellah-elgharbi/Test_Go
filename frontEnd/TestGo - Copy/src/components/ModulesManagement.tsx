import React, { useState, useEffect, JSX } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Plus, Trash2, Edit, X } from 'lucide-react';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

// Define types
interface Module {
  id: number;
  numero: string;
  nom: string;
  td: string;
}

const ModulesManagement: React.FC = () => {
  // Initial data for the modules table
  const initialModules: Module[] = [
    { id: 1, numero: '6354935', nom: 'JS', td: '###' },
    { id: 2, numero: '1234253', nom: 'SQL', td: '###' },
    { id: 3, numero: '5342314', nom: 'MIS', td: '##' },
    { id: 4, numero: '2534312', nom: 'python', td: '##' },
    { id: 5, numero: '2534214', nom: 'google', td: '###' },
    { id: 6, numero: '2342314', nom: 'Micro', td: '###' },
    { id: 7, numero: '3242314', nom: 'chiffre', td: '###' },
    { id: 8, numero: '2342314', nom: 'cloud', td: '###' },
    { id: 9, numero: '7865421', nom: 'AI', td: '#' },
    { id: 10, numero: '9087654', nom: 'React', td: '##' },
    { id: 11, numero: '6543219', nom: 'Vue', td: '##' },
    { id: 12, numero: '3214569', nom: 'Angular', td: '###' },
  ];

  // State management
  const [modules, setModules] = useState<Module[]>(initialModules);
  const [filteredModules, setFilteredModules] = useState<Module[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(8);
  
  // Modal states
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [newModule, setNewModule] = useState<Omit<Module, 'id'>>({ numero: '', nom: '', td: '' });

  // Handle search functionality
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredModules(modules);
    } else {
      const filtered = modules.filter(
        module => 
        module.numero.toLowerCase().includes(searchQuery.toLowerCase()) ||
        module.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
        module.td.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredModules(filtered);
    }
    setCurrentPage(1);
  }, [searchQuery, modules]);

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentModules = filteredModules.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredModules.length / itemsPerPage);

  // Initialize filtered modules
  useEffect(() => {
    setFilteredModules(modules);
  }, []);

  // Handle delete functionality
  const handleDelete = (moduleId: number): void => {
    const moduleToDelete = modules.find(module => module.id === moduleId);
    if (moduleToDelete) {
      setSelectedModule(moduleToDelete);
      setShowDeleteModal(true);
    }
  };

  const confirmDelete = (): void => {
    if (selectedModule) {
      const updatedModules = modules.filter(module => module.id !== selectedModule.id);
      setModules(updatedModules);
      setShowDeleteModal(false);
    }
  };

  // Handle edit functionality
  const handleEdit = (moduleId: number): void => {
    const moduleToEdit = modules.find(module => module.id === moduleId);
    if (moduleToEdit) {
      setSelectedModule({...moduleToEdit});
      setShowEditModal(true);
    }
  };

  const confirmEdit = (): void => {
    if (selectedModule) {
      const updatedModules = modules.map(module => 
        module.id === selectedModule.id ? selectedModule : module
      );
      setModules(updatedModules);
      setShowEditModal(false);
    }
  };

  // Handle add functionality
  const handleAdd = (): void => {
    setNewModule({ numero: '', nom: '', td: '' });
    setShowAddModal(true);
  };

  const confirmAdd = (): void => {
    if (newModule.numero && newModule.nom) {
      const newId = Math.max(...modules.map(m => m.id), 0) + 1;
      const updatedModules = [...modules, { ...newModule, id: newId }];
      setModules(updatedModules);
      setShowAddModal(false);
    }
  };

  // Generate pagination items
  const renderPaginationItems = (): JSX.Element[] => {
    const items: JSX.Element[] = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink 
            href="#" 
            isActive={i === currentPage}
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.preventDefault();
              setCurrentPage(i);
            }}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return items;
  };
  
  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b flex justify-between items-center p-4">
        <h1 className="text-xl font-medium">Module</h1>
        <Button 
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700 h-8 w-8 rounded flex items-center justify-center text-white p-0"
        >
          <Plus className="h-5 w-5" />
        </Button>
      </div>
      
      {/* Main content */}
      <div className="flex-1 p-4 flex flex-col">
        {/* Search and add button */}
        <div className="flex items-center gap-2 mb-4">
          <Button 
            onClick={handleAdd}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center"
          >
            <Plus className="mr-2 h-4 w-4" />
            Module
          </Button>
          
          <div className="relative flex-1 max-w-md ml-2">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input 
              type="text" 
              placeholder="Search" 
              className="pl-10 w-full"
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {/* Table header */}
        <div className="flex border-b border-gray-200 py-2 text-sm font-medium text-gray-500">
          <div className="flex-shrink-0 w-1/6">CPE</div>
          <div className="flex-1">Module</div>
        </div>
        
        {/* Table */}
        <div className="bg-white rounded-md border flex-1 overflow-hidden mt-2">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left px-4 py-3 font-medium text-gray-500">Numéro</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Nom</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">TD</th>
                <th className="px-4 py-3"></th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {currentModules.length > 0 ? (
                currentModules.map((module) => (
                  <tr key={module.id} className="border-b">
                    <td className="px-4 py-3">{module.numero}</td>
                    <td className="px-4 py-3">{module.nom}</td>
                    <td className="px-4 py-3">{module.td}</td>
                    <td className="px-4 py-3">
                      <Button 
                        onClick={() => handleDelete(module.id)}
                        className="bg-red-100 text-red-500 hover:bg-red-200 text-xs px-3 py-1 rounded-md"
                      >
                        supprimer
                      </Button>
                    </td>
                    <td className="px-4 py-3">
                      <Button 
                        onClick={() => handleEdit(module.id)}
                        className="bg-green-100 text-green-500 hover:bg-green-200 text-xs px-3 py-1 rounded-md"
                      >
                        modifier
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                    No modules found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Footer with pagination */}
        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
          <div>
            Items per page: <span className="font-medium">{itemsPerPage}</span>
          </div>
          
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  href="#" 
                  onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.preventDefault();
                    setCurrentPage(prev => Math.max(1, prev - 1));
                  }}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              
              {renderPaginationItems()}
              
              <PaginationItem>
                <PaginationNext 
                  href="#" 
                  onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.preventDefault();
                    setCurrentPage(prev => Math.min(totalPages, prev + 1));
                  }}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>

      {/* Delete Modal */}
      {selectedModule && (
        <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              Are you sure you want to delete module <span className="font-medium">{selectedModule.nom}</span>?
            </div>
            <DialogFooter className="sm:justify-between">
              <DialogClose asChild>
                <Button 
                  type="button" 
                  variant="outline"
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button 
                type="button" 
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Edit Modal */}
      {selectedModule && (
        <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Module</DialogTitle>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <div className="grid w-full items-center gap-2">
                <Label htmlFor="numero">Numéro</Label>
                <Input 
                  id="numero" 
                  value={selectedModule.numero} 
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                    setSelectedModule({...selectedModule, numero: e.target.value})
                  }
                />
              </div>
              <div className="grid w-full items-center gap-2">
                <Label htmlFor="nom">Nom</Label>
                <Input 
                  id="nom" 
                  value={selectedModule.nom} 
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                    setSelectedModule({...selectedModule, nom: e.target.value})
                  }
                />
              </div>
              <div className="grid w-full items-center gap-2">
                <Label htmlFor="td">TD</Label>
                <Input 
                  id="td" 
                  value={selectedModule.td} 
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                    setSelectedModule({...selectedModule, td: e.target.value})
                  }
                />
              </div>
            </div>
            <DialogFooter className="sm:justify-between">
              <DialogClose asChild>
                <Button 
                  type="button" 
                  variant="outline"
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button 
                type="button" 
                onClick={confirmEdit}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Add Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Module</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="new-numero">Numéro</Label>
              <Input 
                id="new-numero" 
                value={newModule.numero} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                  setNewModule({...newModule, numero: e.target.value})
                }
              />
            </div>
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="new-nom">Nom</Label>
              <Input 
                id="new-nom" 
                value={newModule.nom} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                  setNewModule({...newModule, nom: e.target.value})
                }
              />
            </div>
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="new-td">TD</Label>
              <Input 
                id="new-td" 
                value={newModule.td} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                  setNewModule({...newModule, td: e.target.value})
                }
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-between">
            <DialogClose asChild>
              <Button 
                type="button" 
                variant="outline"
                className="bg-gray-100 hover:bg-gray-200 text-gray-700"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button 
              type="button" 
              onClick={confirmAdd}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={!newModule.numero || !newModule.nom}
            >
              Add Module
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ModulesManagement;