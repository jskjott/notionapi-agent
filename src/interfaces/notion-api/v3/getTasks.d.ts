import { Util } from "../.."

export namespace GetTasks {
  interface Request {
    taskIds: [Util.UUID]
  }

  interface Response {  
    results: [{
      id: Util.UUID,
      eventName: 'duplicateBlock',
      request: {
        addCopyName: Boolean,
        sourceBlockId: Util.UUID,
        targetBlockId: Util.UUID,
      },
      actor: {
        id: Util.UUID,
        table: 'notion_user'
      },
      state: 'success' | 'in_progress' | 'failure'
    }],
    transactionId: Util.UUID
    
    
   }

}