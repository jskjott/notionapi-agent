import { Util } from "../.."

export namespace EnqueueTask {
  
  interface Request {
    task: {
      eventName: 'duplicateBlock'
      request: {
        addCopyName: Boolean,
        sourceBlockId: Util.UUID,
        targetBlockId: Util.UUID,
      }
    }
  }

  interface Response {  
    taskId: Util.UUID
   }

}