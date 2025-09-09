import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DocumentUploadModal = ({ application, onClose }) => {
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [uploadProgress, setUploadProgress] = useState({});
  const [dragOver, setDragOver] = useState(null);

  const handleFileSelect = (docType, files) => {
    if (files && files?.length > 0) {
      const file = files?.[0];
      setUploadedFiles(prev => ({ ...prev, [docType]: file }));
      
      // Simulate upload progress
      setUploadProgress(prev => ({ ...prev, [docType]: 0 }));
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          const newProgress = prev?.[docType] + 10;
          if (newProgress >= 100) {
            clearInterval(interval);
            return { ...prev, [docType]: 100 };
          }
          return { ...prev, [docType]: newProgress };
        });
      }, 100);
    }
  };

  const handleDragOver = (e, docType) => {
    e?.preventDefault();
    setDragOver(docType);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setDragOver(null);
  };

  const handleDrop = (e, docType) => {
    e?.preventDefault();
    setDragOver(null);
    const files = e?.dataTransfer?.files;
    handleFileSelect(docType, files);
  };

  const handleSubmit = () => {
    // Here you would typically upload the files to your server
    console.log('Uploading documents:', uploadedFiles);
    
    // Show success message and close modal
    alert('Documents uploaded successfully!');
    onClose();
  };

  const removeFile = (docType) => {
    setUploadedFiles(prev => {
      const newFiles = { ...prev };
      delete newFiles?.[docType];
      return newFiles;
    });
    setUploadProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress?.[docType];
      return newProgress;
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Upload Required Documents</h3>
            <p className="text-sm text-muted-foreground">{application?.propertyTitle}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            iconName="X"
          />
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="space-y-6">
            {application?.requiredDocuments?.map((docType, index) => {
              const isUploaded = uploadedFiles?.[docType];
              const progress = uploadProgress?.[docType];
              const isUploading = progress !== undefined && progress < 100;
              const isCompleted = progress === 100;

              return (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-foreground">{docType}</h4>
                    {isCompleted && (
                      <span className="text-success text-sm font-medium flex items-center space-x-1">
                        <Icon name="CheckCircle" size={16} />
                        <span>Uploaded</span>
                      </span>
                    )}
                  </div>
                  <div
                    className={`border-2 border-dashed rounded-lg p-6 transition-colors ${
                      dragOver === docType 
                        ? 'border-primary bg-primary/5' 
                        : isCompleted 
                        ? 'border-success bg-success/5' :'border-border bg-muted/30'
                    }`}
                    onDragOver={(e) => handleDragOver(e, docType)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, docType)}
                  >
                    {isUploaded ? (
                      <div className="text-center">
                        <Icon name="FileText" size={32} className="text-primary mx-auto mb-3" />
                        <p className="text-sm font-medium text-foreground mb-1">{isUploaded?.name}</p>
                        <p className="text-xs text-muted-foreground mb-3">
                          {(isUploaded?.size / 1024 / 1024)?.toFixed(2)} MB
                        </p>

                        {isUploading && (
                          <div className="mb-3">
                            <div className="w-full bg-muted rounded-full h-2">
                              <div
                                className="bg-primary h-2 rounded-full transition-all duration-300"
                                style={{ width: `${progress}%` }}
                              ></div>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">Uploading... {progress}%</p>
                          </div>
                        )}

                        <div className="flex justify-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeFile(docType)}
                            iconName="Trash2"
                            iconPosition="left"
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Icon name="Upload" size={32} className="text-muted-foreground mx-auto mb-3" />
                        <p className="text-sm text-foreground mb-1">
                          Drop your {docType?.toLowerCase()} here or{' '}
                          <label className="text-primary cursor-pointer hover:underline">
                            browse files
                            <input
                              type="file"
                              className="hidden"
                              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                              onChange={(e) => handleFileSelect(docType, e?.target?.files)}
                            />
                          </label>
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Supported formats: PDF, JPG, PNG, DOC, DOCX (Max 10MB)
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Upload Guidelines */}
          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <h5 className="font-medium text-foreground mb-2 flex items-center">
              <Icon name="Info" size={16} className="mr-2" />
              Upload Guidelines
            </h5>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Ensure all documents are clear and readable</li>
              <li>• Files should be in PDF, JPG, PNG, DOC, or DOCX format</li>
              <li>• Maximum file size is 10MB per document</li>
              <li>• Personal information should be visible and not redacted</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <p className="text-sm text-muted-foreground">
            {Object.keys(uploadedFiles)?.length} of {application?.requiredDocuments?.length} documents uploaded
          </p>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={Object.keys(uploadedFiles)?.length < application?.requiredDocuments?.length}
              iconName="Upload"
              iconPosition="left"
            >
              Upload All Documents
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentUploadModal;